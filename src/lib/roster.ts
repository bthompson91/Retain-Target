export type Tone =
  | "audio"
  | "vision"
  | "lighting"
  | "logistics"
  | "director"
  | "camera"
  | "av"
  | "cancelled"
  | "other";

export type ShiftStatus = "confirmed" | "unconfirmed";

export type Edge = "confirmed" | "unconfirmed" | "open";

export type Assignment = {
  id: string;
  employee: string;
  fn: string;
  role: string;
  tone: Tone;
  status: ShiftStatus;
  start: Date;
  end: Date;
  comment: string;
  fnComment: string;
  mobile: string;
  phone: string;
};

export type RosterEvent = {
  id: string;
  name: string;
  assignments: Assignment[];
};

export type Department = {
  id: string;
  name: string;
  events: RosterEvent[];
};

export type Zoom = "day" | "week" | "qday" | "hour";

export const ZOOM: Record<Zoom, { slotHours: number; slotPx: number; label: string; fitDays: number }> = {
  day: { slotHours: 24, slotPx: 96, label: "2 Weeks", fitDays: 14 },
  week: { slotHours: 24, slotPx: 160, label: "Week", fitDays: 7 },
  qday: { slotHours: 6, slotPx: 92, label: "3 Day", fitDays: 3 },
  hour: { slotHours: 1, slotPx: 52, label: "Day", fitDays: 0 },
};

const MELBOURNE_OFFSET_MS = 11 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export type MelParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dow: number;
};

export function melParts(instant: Date): MelParts {
  const shifted = new Date(instant.getTime() + MELBOURNE_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    dow: shifted.getUTCDay(),
  };
}

export function melbourne(year: number, month: number, day: number, hour = 0, minute = 0): Date {
  return new Date(Date.UTC(year, month, day, hour, minute) - MELBOURNE_OFFSET_MS);
}

export function startOfMelDay(instant: Date): Date {
  const p = melParts(instant);
  return melbourne(p.year, p.month, p.day);
}

export function startOfMelWeek(instant: Date): Date {
  const dayStart = startOfMelDay(instant);
  const dow = melParts(dayStart).dow;
  const delta = dow === 0 ? 6 : dow - 1;
  return new Date(dayStart.getTime() - delta * DAY_MS);
}

export function formatDayLabel(instant: Date): string {
  const p = melParts(instant);
  return `${DOW[p.dow]} ${p.day} ${MON[p.month]}`;
}

export function formatHourLabel(instant: Date): string {
  return String(melParts(instant).hour).padStart(2, "0");
}

export function formatClock(instant: Date): string {
  const p = melParts(instant);
  return `${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`;
}

export function formatWeek(start: Date, endExclusive: Date): string {
  const a = melParts(start);
  const last = melParts(new Date(endExclusive.getTime() - 1));
  if (a.month === last.month && a.year === last.year) {
    return `${a.day}–${last.day} ${MON[a.month]} ${a.year}`;
  }
  return `${a.day} ${MON[a.month]} – ${last.day} ${MON[last.month]} ${last.year}`;
}

export function isoMelDay(instant: Date): string {
  const p = melParts(instant);
  const month = String(p.month + 1).padStart(2, "0");
  const day = String(p.day).padStart(2, "0");
  return `${p.year}-${month}-${day}`;
}

function parseIsoDay(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return melbourne(year, month - 1, day);
}

/** Empty from/to means the whole roster. Dates are Melbourne civil days, end inclusive. */
export function windowForRange(
  origin: Date,
  dayCount: number,
  from: string,
  to: string,
): { origin: Date; dayCount: number; filtered: boolean } {
  const fromDay = parseIsoDay(from);
  const toDay = parseIsoDay(to);
  if (!fromDay && !toDay) return { origin, dayCount, filtered: false };

  const fullEnd = origin.getTime() + dayCount * DAY_MS;
  let start = fromDay ? fromDay.getTime() : origin.getTime();
  let end = toDay ? toDay.getTime() + DAY_MS : fullEnd;
  if (!toDay && end <= start) end = start + DAY_MS;
  if (!fromDay && end <= start) start = end - DAY_MS;
  if (fromDay && toDay && end <= start) {
    start = toDay.getTime();
    end = fromDay.getTime() + DAY_MS;
  }
  return {
    origin: new Date(start),
    dayCount: Math.max(1, Math.round((end - start) / DAY_MS)),
    filtered: true,
  };
}

export function formatSpan(start: Date, end: Date): string {
  const a = melParts(start);
  const b = melParts(end);
  const same = a.year === b.year && a.month === b.month && a.day === b.day;
  const left = `${DOW[a.dow]} ${a.day} ${MON[a.month]}, ${formatClock(start)}`;
  const right = same ? formatClock(end) : `${DOW[b.dow]} ${b.day} ${MON[b.month]}, ${formatClock(end)}`;
  return `${left}–${right}`;
}

export function xFor(instant: Date, origin: Date, pxPerHour: number): number {
  const hours = (instant.getTime() - origin.getTime()) / HOUR_MS;
  return hours * pxPerHour;
}

export function eachDay(origin: Date, dayCount = 7): Date[] {
  return Array.from({ length: dayCount }, (_, i) => new Date(origin.getTime() + i * DAY_MS));
}

export function eachSlot(origin: Date, zoom: Zoom, dayCount = 7): Date[] {
  const z = ZOOM[zoom];
  const count = (dayCount * 24) / z.slotHours;
  const step = z.slotHours * HOUR_MS;
  return Array.from({ length: count }, (_, i) => new Date(origin.getTime() + i * step));
}

export function toneForRole(role: string): Tone {
  const r = role.toLowerCase();
  if (/cancelled\s+shift/.test(r) || /\brdo\b/.test(r)) return "cancelled";
  if (/\btechnical director\b|\btech director\b|\btd\b/.test(r)) return "director";
  if (/\bwarehouse\b|\bdriver\b|\bloader\b|\bvan\b|\btruck\b|\btest\s*(?:and|&)\s*tag\b/.test(r)) return "logistics";
  if (/\bcamera\b|\bcam\b/.test(r)) return "camera";
  if (/\bdes\b/.test(r)) return "vision";
  if (/\baudio\b|\ba1\b|\ba2\b|\ba3\b|\brf\b|\bsound\b/.test(r)) return "audio";
  if (/\bvision\b|\bv1\b|\bv2\b|\bv3\b/.test(r)) return "vision";
  if (/\blighting\b|\blx\b|\bld\b/.test(r)) return "lighting";
  if (/\bav\b/.test(r)) return "av";
  return "other";
}

export function edgeFor(employee: string, status: ShiftStatus): Edge {
  const name = employee.trim();
  if (!name || /^\d/.test(name) || /^unassigned$/i.test(name)) return "open";
  return status === "unconfirmed" ? "unconfirmed" : "confirmed";
}

export function packLanes(spans: { start: number; end: number }[]): number[] {
  const order = spans
    .map((span, index) => ({ ...span, index }))
    .sort((a, b) => a.start - b.start || a.end - b.end);
  return assignLanes(order);
}

/** Top lane is the first roster name. A later name only shares that lane when the times do not overlap. */
export function packLanesByName(spans: { employee: string; start: number; end: number }[]): number[] {
  const order = spans
    .map((span, index) => ({ ...span, index }))
    .sort(
      (a, b) =>
        a.employee.localeCompare(b.employee, undefined, { sensitivity: "base" }) || a.start - b.start || a.end - b.end,
    );
  return assignLanes(order);
}

function assignLanes(order: { index: number; start: number; end: number }[]): number[] {
  const laneEnds: number[] = [];
  const laneOf = new Array<number>(order.length).fill(0);
  for (const span of order) {
    let lane = laneEnds.findIndex((end) => end <= span.start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(span.end);
    } else {
      laneEnds[lane] = span.end;
    }
    laneOf[span.index] = lane;
  }
  return laneOf;
}

export function slotOnDay(slot: Date, dayStart: Date): boolean {
  const t = slot.getTime();
  return t >= dayStart.getTime() && t < dayStart.getTime() + DAY_MS;
}
