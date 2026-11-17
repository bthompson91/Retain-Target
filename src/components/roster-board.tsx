import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { parseRosterCsv, type ParsedRoster } from "@/lib/csv-roster";
import {
  ZOOM,
  eachDay,
  eachSlot,
  edgeFor,
  formatDayLabel,
  formatHourLabel,
  formatSpan,
  formatWeek,
  melParts,
  packLanes,
  slotOnDay,
  startOfMelDay,
  startOfMelWeek,
  xFor,
  type Assignment,
  type Tone,
  type Zoom,
} from "@/lib/roster";

type LaidAssignment = Assignment & { lane: number };

type LaidEvent = {
  id: string;
  name: string;
  dept: string;
  laneCount: number;
  assignments: LaidAssignment[];
};

type LaidDept = {
  id: string;
  name: string;
  events: LaidEvent[];
};

const ZOOMS: Zoom[] = ["day", "qday", "hour"];

function hoursToPx(hours: number, zoom: Zoom): number {
  const z = ZOOM[zoom];
  return (hours / z.slotHours) * z.slotPx;
}

export function RosterBoard() {
  const now = useMemo(() => new Date(), []);
  const [zoom, setZoom] = useState<Zoom>("hour");
  const [closed, setClosed] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nowX, setNowX] = useState<number | null>(null);
  const [parsed, setParsed] = useState<ParsedRoster | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const weekStart = parsed?.origin ?? startOfMelWeek(now);
  const dayCount = parsed?.dayCount ?? 7;
  const weekEnd = useMemo(() => new Date(weekStart.getTime() + dayCount * 86_400_000), [weekStart, dayCount]);
  const todayStart = useMemo(() => startOfMelDay(now), [now]);
  const todayIndex = Math.round((todayStart.getTime() - weekStart.getTime()) / 86_400_000);
  const todayInRange = todayIndex >= 0 && todayIndex < dayCount;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const anchorHours = useRef<number | null>(null);
  const booted = useRef(false);

  const roster = parsed?.departments ?? [];

  const laid = useMemo<LaidDept[]>(
    () =>
      roster.map((dept) => ({
        id: dept.id,
        name: dept.name,
        events: dept.events.map((event) => {
          const lanes = packLanes(
            event.assignments.map((a) => ({ start: a.start.getTime(), end: a.end.getTime() })),
          );
          const laneCount = lanes.length ? Math.max(...lanes) + 1 : 1;
          return {
            id: event.id,
            name: event.name,
            dept: dept.name,
            laneCount,
            assignments: event.assignments.map((a, i) => ({ ...a, lane: lanes[i] ?? 0 })),
          };
        }),
      })),
    [roster],
  );

  const selected = useMemo(() => {
    if (!selectedId) return null;
    for (const dept of laid) {
      for (const event of dept.events) {
        const hit = event.assignments.find((a) => a.id === selectedId);
        if (hit) return { ...hit, event: event.name, dept: dept.name };
      }
    }
    return null;
  }, [laid, selectedId]);

  const z = ZOOM[zoom];
  const dayPx = (24 / z.slotHours) * z.slotPx;
  const timelinePx = dayPx * dayCount;
  const todayLeft = todayInRange ? todayIndex * dayPx : -dayPx;
  const days = eachDay(weekStart, dayCount);
  const slots = zoom === "day" ? [] : eachSlot(weekStart, zoom, dayCount);
  const sheetStyle = {
    "--slot": `${z.slotPx}px`,
    "--day": `${dayPx}px`,
    "--timeline": `${timelinePx}px`,
  } as CSSProperties;

  useEffect(() => {
    const x = xFor(new Date(), weekStart, zoom);
    setNowX(x >= 0 && x <= timelinePx ? x : null);
  }, [weekStart, zoom, timelinePx]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (!booted.current) {
      if (!parsed) return;
      booted.current = true;
      const narrow = window.innerWidth < 720;
      const next: Zoom = narrow ? "qday" : "hour";
      const label = el.querySelector<HTMLElement>(".corner")?.offsetWidth ?? 0;
      const spec = ZOOM[next];
      const visibleHours = ((el.clientWidth - label) / spec.slotPx) * spec.slotHours;
      const hours = !todayInRange
        ? 0
        : visibleHours >= 18
          ? Math.max(0, todayIndex * 24 - Math.min(6, visibleHours - 16))
          : Math.max(0, todayIndex * 24 + 8);
      anchorHours.current = hours;
      if (next !== zoom) {
        setZoom(next);
        return;
      }
    }

    if (anchorHours.current == null) return;
    el.scrollLeft = hoursToPx(anchorHours.current, zoom);
  }, [todayIndex, todayInRange, zoom, parsed]);

  useEffect(() => {
    let cancel = false;
    fetch("/roster.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Couldn't read the roster.");
        return response.text();
      })
      .then((text) => {
        if (!cancel) setParsed(parseRosterCsv(text, "Timetarget Roster Export 18-11-2026.csv"));
      })
      .catch((error: unknown) => {
        if (!cancel) setLoadError(error instanceof Error ? error.message : "Couldn't read the roster.");
      });
    return () => {
      cancel = true;
    };
  }, []);

  function loadFile(file: File) {
    file
      .text()
      .then((text) => {
        setParsed(parseRosterCsv(text, file.name));
        setLoadError(null);
        setSelectedId(null);
        setClosed([]);
        booted.current = false;
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "Couldn't read that CSV.");
      });
  }

  function changeZoom(next: Zoom) {
    const el = scrollerRef.current;
    if (el) {
      const spec = ZOOM[zoom];
      anchorHours.current = (el.scrollLeft / spec.slotPx) * spec.slotHours;
    }
    setZoom(next);
  }

  function goToday() {
    const el = scrollerRef.current;
    if (!el) return;
    const hours = todayIndex * 24 + (zoom === "day" ? 0 : 8);
    anchorHours.current = hours;
    el.scrollTo({ left: hoursToPx(hours, zoom), behavior: "smooth" });
  }

  function toggleDept(id: string) {
    setClosed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function barBox(start: Date, end: Date) {
    const left = Math.max(0, xFor(start, weekStart, zoom));
    const right = Math.min(timelinePx, xFor(end, weekStart, zoom));
    if (right - left < 1) return null;
    return { left, width: right - left };
  }

  return (
    <div className="shell">
      <header className="toolbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <h1>Retain Target</h1>
            <p>
              {parsed
                ? `${formatWeek(weekStart, weekEnd)} · ${parsed.shiftCount.toLocaleString("en-AU")} shifts`
                : (loadError ?? "Loading roster…")}
            </p>
          </div>
        </div>
        <div className="controls">
          <div className="zoom" role="radiogroup" aria-label="Zoom">
            {ZOOMS.map((id) => (
              <button
                key={id}
                type="button"
                className="zoom-btn"
                aria-pressed={zoom === id}
                onClick={() => changeZoom(id)}
              >
                {ZOOM[id].label}
              </button>
            ))}
          </div>
          <label className="file-btn" title={parsed?.fileName ?? "Upload a TimeTarget CSV"}>
            CSV
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) loadFile(file);
                event.currentTarget.value = "";
              }}
            />
          </label>
          <button type="button" className="today-btn" onClick={goToday}>
            Today
          </button>
        </div>
      </header>

      <div className="scroller" ref={scrollerRef}>
        <div className="sheet" style={sheetStyle}>
          <div className="head">
            <div className="corner">Events</div>
            <div className="head-time">
              <div className="day-row">
                {days.map((day, index) => {
                  const isToday = index === todayIndex;
                  return (
                    <div
                      key={day.toISOString()}
                      className="day-cell"
                      data-today={isToday ? "true" : "false"}
                      data-shade={index % 2 ? "b" : "a"}
                      data-fine={zoom === "day" ? "false" : "true"}
                      style={{ width: dayPx }}
                    >
                      {formatDayLabel(day)}
                      {isToday && dayPx > 180 ? " · Today" : ""}
                    </div>
                  );
                })}
              </div>
              {slots.length > 0 && (
                <div className="slot-row">
                  {slots.map((slot, index) => {
                    const parts = melParts(slot);
                    const onToday = slotOnDay(slot, todayStart);
                    return (
                      <div
                        key={slot.toISOString()}
                        className="slot-cell"
                        data-shade={index % 2 ? "b" : "a"}
                        data-today={onToday ? "true" : "false"}
                        data-day={parts.hour === 0 ? "true" : "false"}
                      >
                        {formatHourLabel(slot)}
                      </div>
                    );
                  })}
                </div>
              )}
              {nowX != null && <div className="now-head" style={{ left: nowX }} />}
            </div>
          </div>

          {laid.map((dept) => {
            const open = !closed.includes(dept.id);
            return (
              <div key={dept.id}>
                <div className="row dept-row">
                  <button
                    type="button"
                    className="dept-label"
                    aria-expanded={open}
                    onClick={() => toggleDept(dept.id)}
                  >
                    <span className="twisty" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                    <span className="dept-name">{dept.name}</span>
                  </button>
                  <Track todayLeft={todayLeft} dayPx={dayPx} zoom={zoom} nowX={nowX} />
                </div>
                {open &&
                  dept.events.map((event) => (
                    <div
                      key={event.id}
                      className="row event-row"
                      style={{ "--lanes": event.laneCount } as CSSProperties}
                    >
                      <div className="event-label" title={event.name}>
                        <span className="event-name">{event.name}</span>
                      </div>
                      <Track todayLeft={todayLeft} dayPx={dayPx} zoom={zoom} nowX={nowX}>
                        {event.assignments.map((a) => {
                          const box = barBox(a.start, a.end);
                          if (!box) return null;
                          const on = selectedId === a.id;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              className="bar"
                              data-tone={a.tone}
                              data-edge={edgeFor(a.employee, a.status)}
                              data-on={on ? "true" : "false"}
                              style={
                                {
                                  "--i": a.lane,
                                  left: box.left,
                                  width: box.width,
                                } as CSSProperties
                              }
                              aria-pressed={on}
                              aria-label={`${a.employee}, ${a.fn}, ${a.role}`}
                              onClick={() => setSelectedId(on ? null : a.id)}
                            >
                              <span className="bar-name">{a.employee}</span>
                              <span className="bar-meta">{a.fn ? `${a.fn} · ${a.role}` : a.role}</span>
                            </button>
                          );
                        })}
                      </Track>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="detail" aria-live="polite">
        {selected ? (
          <>
            <span className="swatch" data-tone={selected.tone as Tone} aria-hidden="true" />
            <div className="detail-copy">
              <p className="detail-name">{selected.employee}</p>
              <p className="detail-role">
                {selected.fn ? `${selected.fn} · ${selected.role}` : selected.role}
              </p>
              <p className="detail-meta">
                {selected.event} · {selected.dept}
              </p>
              <p className="detail-meta">
                {formatSpan(selected.start, selected.end)}
                {" · "}
                {edgeFor(selected.employee, selected.status) === "open"
                  ? "Unassigned"
                  : selected.status === "confirmed"
                    ? "Confirmed"
                    : "Unconfirmed"}
              </p>
            </div>
          </>
        ) : (
          <p className="detail-hint">
            {loadError
              ? loadError
              : parsed
                ? "Departments fold with +. Zoom goes down to the hour. Today is blue. Tap a shift for the times."
                : "Loading roster…"}
          </p>
        )}
      </footer>
    </div>
  );
}

function Track({
  todayLeft,
  dayPx,
  zoom,
  nowX,
  children,
}: {
  todayLeft: number;
  dayPx: number;
  zoom: Zoom;
  nowX: number | null;
  children?: ReactNode;
}) {
  return (
    <div className="track">
      <div className="track-bg" />
      <div className="today-wash" style={{ left: todayLeft, width: dayPx }} />
      {zoom !== "day" && <div className="hour-lines" />}
      <div className="day-lines" />
      {children}
      {nowX != null && <div className="now" style={{ left: nowX }} />}
    </div>
  );
}
