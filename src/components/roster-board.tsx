import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { parseRosterCsv, parseRosterXlsx, type ParsedRoster } from "@/lib/csv-roster";
import { colorForRole, inkForColor } from "@/lib/role-colors";
import {
  ZOOM,
  eachDay,
  eachSlot,
  edgeFor,
  formatDayLabel,
  formatHourLabel,
  formatClock,
  formatSpan,
  formatWeek,
  isoMelDay,
  melParts,
  packLanes,
  packLanesByName,
  slotOnDay,
  startOfMelDay,
  startOfMelWeek,
  windowForRange,
  xFor,
  type Assignment,
  type Zoom,
} from "@/lib/roster";

type LaidAssignment = Assignment & { lane: number; eventName: string; deptName: string };

type LaidEvent = {
  id: string;
  name: string;
  dept: string;
  contact: string;
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
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [rotated, setRotated] = useState(false);
  const [deptFilter, setDeptFilter] = useState<string[] | null>(null);
  const [deptOpen, setDeptOpen] = useState(false);
  const [tip, setTip] = useState<{
    left: number;
    top: number;
    above: boolean;
    date: string;
    start: string;
    end: string;
    comment: string;
    fnComment: string;
  } | null>(null);
  const [viewPx, setViewPx] = useState({ start: 0, end: Number.POSITIVE_INFINITY });

  const fullOrigin = useMemo(() => parsed?.origin ?? startOfMelWeek(now), [parsed, now]);
  const fullDays = parsed?.dayCount ?? 7;
  const view = useMemo(
    () => windowForRange(fullOrigin, fullDays, rangeFrom, rangeTo),
    [fullOrigin, fullDays, rangeFrom, rangeTo],
  );
  const weekStart = view.origin;
  const dayCount = view.dayCount;
  const weekEnd = useMemo(() => new Date(weekStart.getTime() + dayCount * 86_400_000), [weekStart, dayCount]);
  const todayStart = useMemo(() => startOfMelDay(now), [now]);
  const todayIndex = Math.round((todayStart.getTime() - weekStart.getTime()) / 86_400_000);
  const todayInRange = todayIndex >= 0 && todayIndex < dayCount;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const anchorHours = useRef<number | null>(null);
  const booted = useRef(false);

  const seenWindow = useRef<string | null>(null);

  const roster = parsed?.departments ?? [];

  const { laid, visibleCount } = useMemo(() => {
    const startMs = weekStart.getTime();
    const endMs = startMs + dayCount * 86_400_000;
    let visibleCount = 0;
    const laid: LaidDept[] = [];
    const pack = (
      id: string,
      name: string,
      dept: string,
      assignments: Array<Assignment & { eventName: string; deptName: string }>,
      byName = false,
    ): LaidEvent | null => {
      if (!assignments.length) return null;
      visibleCount += assignments.length;
      const lanes = byName
        ? packLanesByName(
            assignments.map((a) => ({ employee: a.employee, start: a.start.getTime(), end: a.end.getTime() })),
          )
        : packLanes(assignments.map((a) => ({ start: a.start.getTime(), end: a.end.getTime() })));
      const laneCount = lanes.length ? Math.max(...lanes) + 1 : 1;
      return {
        id,
        name,
        dept,
        laneCount,
        assignments: assignments.map((a, i) => ({ ...a, lane: lanes[i] ?? 0 })),
        contact: "",
      };
    };
    if (rotated) {
      const byPerson = new Map<string, Array<Assignment & { eventName: string; deptName: string }>>();
      const mobiles = new Map<string, string>();
      const phones = new Map<string, string>();
      for (const dept of roster) {
        if (deptFilter && !deptFilter.includes(dept.name)) continue;
        for (const event of dept.events) {
          for (const assignment of event.assignments) {
            const list = byPerson.get(assignment.employee) ?? [];
            if (!byPerson.has(assignment.employee)) byPerson.set(assignment.employee, list);
            if (assignment.mobile && !mobiles.has(assignment.employee)) mobiles.set(assignment.employee, assignment.mobile);
            if (assignment.phone && !phones.has(assignment.employee)) phones.set(assignment.employee, assignment.phone);
            if (assignment.end.getTime() <= startMs || assignment.start.getTime() >= endMs) continue;
            list.push({ ...assignment, eventName: event.name, deptName: dept.name });
          }
        }
      }
      const events: LaidEvent[] = [];
      for (const name of [...byPerson.keys()].sort((a, b) => {
        const openA = !a.trim() || /^unassigned$/i.test(a.trim()) || /^\d/.test(a.trim());
        const openB = !b.trim() || /^unassigned$/i.test(b.trim()) || /^\d/.test(b.trim());
        if (openA !== openB) return openA ? -1 : 1;
        return a.localeCompare(b, undefined, { sensitivity: "base" });
      })) {
        const row = pack(name, name, name, byPerson.get(name) ?? []);
        const contact = mobiles.get(name) || phones.get(name) || "";
        events.push(
          row
            ? { ...row, contact }
            : {
                id: name,
                name,
                dept: name,
                contact,
                laneCount: 1,
                assignments: [],
              },
        );
      }
      if (events.length) laid.push({ id: "people", name: "", events });
      return { laid, visibleCount };
    }
    const departments = [...roster].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    for (const dept of departments) {
      const events: LaidEvent[] = [];
      for (const event of dept.events) {
        const assignments = event.assignments
          .filter((a) => a.end.getTime() > startMs && a.start.getTime() < endMs)
          .map((a) => ({ ...a, eventName: event.name, deptName: dept.name }));
        const row = pack(event.id, event.name, dept.name, assignments, true);
        if (row) events.push(row);
      }
      if (events.length) laid.push({ id: dept.id, name: dept.name, events });
    }
    return { laid, visibleCount };
  }, [roster, weekStart, dayCount, rotated, deptFilter]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    for (const dept of laid) {
      for (const event of dept.events) {
        const hit = event.assignments.find((a) => a.id === selectedId);
        if (hit) return { ...hit, event: hit.eventName, dept: hit.deptName };
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
    "--check": zoom === "qday" ? `${dayPx}px` : `${z.slotPx}px`,
  } as CSSProperties;

  const shown = useMemo(() => {
    if (rotated) return laid;
    if (!(viewPx.end > viewPx.start) || !Number.isFinite(viewPx.end)) return laid;
    return laid
      .map((dept) => ({
        ...dept,
        events: dept.events.filter((event) =>
          event.assignments.some((assignment) => {
            const left = Math.max(0, xFor(assignment.start, weekStart, zoom));
            const right = Math.min(timelinePx, xFor(assignment.end, weekStart, zoom));
            return right - left >= 1 && left < viewPx.end && right > viewPx.start;
          }),
        ),
      }))
      .filter((dept) => dept.events.length > 0);
  }, [laid, viewPx, weekStart, zoom, timelinePx, rotated]);

  function measureView() {
    const el = scrollerRef.current;
    if (!el) return;
    const label = el.querySelector<HTMLElement>(".corner")?.offsetWidth ?? 0;
    const start = el.scrollLeft;
    const width = el.clientWidth - label;
    if (width < 40) return;
    const end = start + width;
    setViewPx((prev) => (Math.abs(prev.start - start) < 1 && Math.abs(prev.end - end) < 1 ? prev : { start, end }));
  }

  useLayoutEffect(() => {
    measureView();
  }, [parsed, zoom, weekStart, dayCount, timelinePx]);

  useEffect(() => {
    const x = xFor(new Date(), weekStart, zoom);
    setNowX(x >= 0 && x <= timelinePx ? x : null);
  }, [weekStart, zoom, timelinePx]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const windowKey = `${weekStart.getTime()}:${dayCount}`;
    const windowChanged = seenWindow.current !== null && seenWindow.current !== windowKey;
    seenWindow.current = windowKey;

    if (!booted.current) {
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
    } else if (windowChanged) {
      const hours = !todayInRange ? 0 : Math.max(0, todayIndex * 24 + (zoom === "day" ? 0 : 8));
      anchorHours.current = hours;
    }

    if (anchorHours.current == null) return;
    el.scrollLeft = hoursToPx(anchorHours.current, zoom);
  }, [todayIndex, todayInRange, zoom, parsed, weekStart, dayCount]);

  function loadFile(file: File) {
    const apply = (next: ParsedRoster) => {
      setParsed(next);
      setLoadError(null);
      setSelectedId(null);
      setTip(null);
      setClosed([]);
      setRangeFrom("");
      setRangeTo("");
      setDeptFilter(null);
      setDeptOpen(false);
      booted.current = false;
    };
    const fail = (error: unknown) => {
      setLoadError(error instanceof Error ? error.message : "Couldn't read that file.");
    };
    const excel = /\.xlsx$/i.test(file.name) || file.type.includes("spreadsheet");
    if (excel) file.arrayBuffer().then((buffer) => apply(parseRosterXlsx(buffer, file.name))).catch(fail);
    else file.text().then((text) => apply(parseRosterCsv(text, file.name))).catch(fail);
  }

  function showTip(target: HTMLElement, shift: LaidAssignment) {
    const rect = target.getBoundingClientRect();
    const width = 320;
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
    const below = rect.bottom + 8;
    const above = below + 240 > window.innerHeight && rect.top > 220;
    const startParts = melParts(shift.start);
    const endParts = melParts(shift.end);
    const sameDay =
      startParts.year === endParts.year && startParts.month === endParts.month && startParts.day === endParts.day;
    setTip({
      left,
      top: above ? rect.top - 8 : below,
      above,
      date: sameDay ? formatDayLabel(shift.start) : `${formatDayLabel(shift.start)} – ${formatDayLabel(shift.end)}`,
      start: formatClock(shift.start),
      end: formatClock(shift.end),
      comment: shift.comment,
      fnComment: shift.fnComment,
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

  function toggleAll() {
    const ids = laid.map((dept) => dept.id);
    const allClosed = ids.length > 0 && ids.every((id) => closed.includes(id));
    setClosed(allClosed ? [] : ids);
  }

  function toggleDeptFilter(name: string) {
    const names = roster.map((dept) => dept.name);
    setDeptFilter((current) => {
      const selected = current ?? names;
      const next = selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name];
      if (next.length === names.length) return null;
      return next;
    });
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
              {loadError ??
                (parsed
                  ? `${formatWeek(weekStart, weekEnd)} · ${
                      view.filtered && visibleCount !== parsed.shiftCount
                        ? `${visibleCount.toLocaleString("en-AU")} of ${parsed.shiftCount.toLocaleString("en-AU")}`
                        : parsed.shiftCount.toLocaleString("en-AU")
                    } shifts${parsed.warnings.length ? ` · ${parsed.warnings.length} parse notes` : ""}`
                  : "No roster loaded")}
            </p>
          </div>
        </div>
        <div className="controls">
          <div className="dates">
            <label>
              From
              <input
                type="date"
                value={rangeFrom}
                min={parsed ? isoMelDay(parsed.origin) : undefined}
                max={
                  parsed
                    ? isoMelDay(new Date(parsed.origin.getTime() + (parsed.dayCount - 1) * 86_400_000))
                    : undefined
                }
                onChange={(event) => setRangeFrom(event.target.value)}
              />
            </label>
            <label>
              To
              <input
                type="date"
                value={rangeTo}
                min={parsed ? isoMelDay(parsed.origin) : undefined}
                max={
                  parsed
                    ? isoMelDay(new Date(parsed.origin.getTime() + (parsed.dayCount - 1) * 86_400_000))
                    : undefined
                }
                onChange={(event) => setRangeTo(event.target.value)}
              />
            </label>
            {view.filtered && (
              <button
                type="button"
                className="today-btn"
                onClick={() => {
                  setRangeFrom("");
                  setRangeTo("");
                }}
              >
                All
              </button>
            )}
          </div>
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
          <label className="file-btn" title={parsed?.fileName ?? "Open a TimeTarget Excel or CSV on this computer. Nothing is uploaded."}>
            Open file
            <input
              type="file"
              accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
          <button
            type="button"
            className="rotate-btn"
            aria-pressed={rotated}
            onClick={() => setRotated((on) => !on)}
          >
            Rotate
          </button>
        </div>
      </header>

      <div
        className="scroller"
        ref={scrollerRef}
        onScroll={() => {
          if (tip) setTip(null);
          measureView();
        }}
      >
        <div className="sheet" style={sheetStyle}>
          <div className="head">
            <div className="corner">
              {rotated ? (
                <div className="dept-filter">
                  <button
                    type="button"
                    className="fold-all"
                    aria-expanded={deptOpen}
                    aria-haspopup="true"
                    onClick={() => setDeptOpen((open) => !open)}
                  >
                    {deptFilter == null
                      ? "All departments"
                      : deptFilter.length === 0
                        ? "No departments"
                        : deptFilter.length === 1
                          ? deptFilter[0]
                          : `${deptFilter.length} departments`}
                  </button>
                  {deptOpen && (
                    <div className="dept-menu" role="group" aria-label="Departments">
                      <label>
                        <input
                          type="checkbox"
                          checked={deptFilter == null}
                          onChange={() => setDeptFilter(deptFilter == null ? [] : null)}
                        />
                        All
                      </label>
                      {roster.map((dept) => (
                        <label key={dept.id}>
                          <input
                            type="checkbox"
                            checked={deptFilter == null || deptFilter.includes(dept.name)}
                            onChange={() => toggleDeptFilter(dept.name)}
                          />
                          {dept.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="fold-all"
                  onClick={toggleAll}
                  disabled={!laid.length}
                >
                  {laid.length > 0 && laid.every((dept) => closed.includes(dept.id)) ? "Expand all" : "Collapse all"}
                </button>
              )}
            </div>
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

          {shown.map((dept) => {
            const open = rotated || !closed.includes(dept.id);
            return (
              <div key={dept.id}>
                {!rotated && (
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
                )}
                {open &&
                  dept.events.map((event) => (
                    <div
                      key={event.id}
                      className="row event-row"
                      style={{ "--lanes": event.laneCount } as CSSProperties}
                    >
                      <div className="event-label" title={event.contact ? `${event.name}, ${event.contact}` : event.name}>
                        <span className="event-name">{event.name}</span>
                        {rotated && event.contact ? <span className="event-contact">{event.contact}</span> : null}
                      </div>
                      <Track todayLeft={todayLeft} dayPx={dayPx} zoom={zoom} nowX={nowX}>
                        {event.assignments.map((a) => {
                          const box = barBox(a.start, a.end);
                          if (!box) return null;
                          const on = selectedId === a.id;
                          const color = colorForRole(a.role);
                          const eventTitle =
                            a.eventName && a.eventName !== "No event" ? a.eventName : a.deptName;
                          const head = rotated ? eventTitle : a.employee;
                          const meta = a.fn ? `${a.fn} · ${a.role}` : a.role;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              className="bar"
                              data-edge={edgeFor(a.employee, a.status)}
                              data-on={on ? "true" : undefined}
                              style={
                                {
                                  "--i": a.lane,
                                  left: box.left,
                                  width: box.width,
                                  background: color,
                                  color: inkForColor(color),
                                } as CSSProperties
                              }
                              aria-pressed={on ? true : undefined}
                              aria-label={rotated ? `${eventTitle}, ${meta}` : `${a.employee}, ${meta}`}
                              onMouseEnter={(event) => showTip(event.currentTarget, a)}
                              onFocus={(event) => showTip(event.currentTarget, a)}
                              onMouseLeave={() => setTip(null)}
                              onBlur={() => setTip(null)}
                              onClick={() => setSelectedId(on ? null : a.id)}
                            >
                              <span className="bar-name">{head}</span>
                              <span className="bar-meta">{meta}</span>
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
            <span
              className="swatch"
              style={{ background: colorForRole(selected.role) }}
              aria-hidden="true"
            />
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
              <p className="detail-note">
                <strong>Comments</strong> {selected.comment || "None"}
              </p>
              <p className="detail-note">
                <strong>Function comments</strong> {selected.fnComment || "None"}
              </p>
            </div>
          </>
        ) : (
          <p className="detail-hint">
            {loadError ??
              (parsed?.warnings.length
                ? parsed.warnings.join(" ")
                : parsed
                  ? visibleCount === 0 && view.filtered
                    ? "No shifts in this date range."
                    : "Departments fold with +. Zoom goes down to the hour. Today is blue. Tap a shift for the times."
                  : "The board is empty. Load a TimeTarget Excel or CSV.")}
          </p>
        )}
      </footer>
      {tip ? (
        <div className="tip" style={{ left: tip.left, top: tip.top }} data-above={tip.above ? "true" : undefined}>
          <p>
            <strong>Date</strong>
            {tip.date}
          </p>
          <p>
            <strong>Start</strong>
            {tip.start}
          </p>
          <p>
            <strong>End</strong>
            {tip.end}
          </p>
          <p>
            <strong>Comments</strong>
            {tip.comment || "None"}
          </p>
          <p>
            <strong>Function comments</strong>
            {tip.fnComment || "None"}
          </p>
        </div>
      ) : null}
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
