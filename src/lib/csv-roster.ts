import {
  melbourne,
  startOfMelDay,
  toneForRole,
  type Assignment,
  type Department,
  type ShiftStatus,
} from "./roster.ts";

const DAY_MS = 86_400_000;
const MIN_MS = 30 * 60 * 1000;

export type ParsedRoster = {
  departments: Department[];
  origin: Date;
  dayCount: number;
  shiftCount: number;
  fileName: string;
  warnings: string[];
};

const GUID = /^\{?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}?$/i;

function parseCsv(text: string, delimiter = ","): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "").replace(/^sep=,\s*/i, "");
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"' && cell.length === 0) quoted = true;
    else if (char === delimiter) {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((line) => line.some((value) => value.trim()));
}

function clock(value: string): { hour: number; minute: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
}

function statusFor(role: string): ShiftStatus {
  return /cancel/i.test(role) ? "unconfirmed" : "confirmed";
}

function isBooleanToken(value: string): boolean {
  return /^(true|false)$/i.test(value);
}

function isGuid(value: string): boolean {
  return GUID.test(value);
}

/** Values that are not a person: Excel booleans and bare ids. */
function isPlaceholderName(value: string): boolean {
  return isBooleanToken(value) || isGuid(value);
}

/** Values that landed in the department column but are not a department. */
function isPlaceholderDepartment(value: string): boolean {
  return (
    isPlaceholderName(value) ||
    /\blaptops?\b/i.test(value) ||
    /^\d+\s*x\b/i.test(value) ||
    /^[A-Z]{2,4}$/.test(value)
  );
}

export function parseRosterCsv(text: string, fileName = "roster.csv"): ParsedRoster {
  let table = parseCsv(text);
  if (!table.length) throw new Error("That CSV is empty.");
  const firstLine = text.replace(/^\uFEFF/, "").split(/\r?\n/, 1)[0] ?? "";
  const commaHeader = table[0].map((value) => value.trim().toLowerCase());
  if (
    !commaHeader.includes("department") &&
    (firstLine.match(/;/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0)
  ) {
    table = parseCsv(text, ";");
  }
  const header = table[0].map((value) => value.trim().toLowerCase());
  const at = (name: string) => header.indexOf(name);
  const col = {
    date: at("date"),
    start: at("start time"),
    end: at("end time"),
    employee: at("employee roster name"),
    department: at("department"),
    event: at("event"),
    fn: at("function"),
    role: at("role"),
  };
  if (Object.values(col).some((index) => index < 0)) {
    throw new Error(
      "CSV needs Date, Start Time, End Time, Employee Roster Name, Department, Event, Function and Role.",
    );
  }

  const cell = (row: string[], index: number) => (row[index] ?? "").trim();
  const drafts: Array<Assignment & { dept: string; event: string }> = [];
  const warnings: string[] = [];
  let hiddenNotes = 0;
  const warn = (message: string) => {
    if (warnings.length < 8) warnings.push(message);
    else hiddenNotes += 1;
  };

  table.slice(1).forEach((row, index) => {
    const line = index + 2;
    if (row.length !== header.length) {
      warn(`Row ${line} has ${row.length} columns, header has ${header.length}.`);
    }
    const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(cell(row, col.date));
    const startClock = clock(cell(row, col.start));
    const endClock = clock(cell(row, col.end));
    if (!date || !startClock || !endClock) {
      warn(`Row ${line} skipped: date or time is not a shift.`);
      return;
    }
    const year = Number(date[3]);
    const month = Number(date[2]) - 1;
    const day = Number(date[1]);
    const start = melbourne(year, month, day, startClock.hour, startClock.minute);
    const startMin = startClock.hour * 60 + startClock.minute;
    const endMin = endClock.hour * 60 + endClock.minute;
    let end: Date;
    if (endMin < startMin) {
      end = melbourne(year, month, day + 1, endClock.hour, endClock.minute);
    } else if (endMin === startMin) {
      end = new Date(start.getTime() + MIN_MS);
    } else if (endClock.hour === 23 && endClock.minute === 59) {
      end = melbourne(year, month, day + 1);
    } else {
      end = melbourne(year, month, day, endClock.hour, endClock.minute);
    }
    const rawEmployee = cell(row, col.employee);
    const rawDept = cell(row, col.department);
    let employee = rawEmployee || "Unassigned";
    let dept = rawDept || "No department";
    if (rawEmployee && isPlaceholderName(rawEmployee)) {
      warn(`Row ${line}: ignored employee "${rawEmployee}".`);
      employee = "Unassigned";
    }
    if (rawDept && isPlaceholderDepartment(rawDept)) {
      warn(`Row ${line}: ignored department "${rawDept}".`);
      dept = "No department";
    }
    const role = cell(row, col.role) || "—";
    drafts.push({
      id: `s${drafts.length}`,
      employee,
      fn: cell(row, col.fn),
      role,
      tone: toneForRole(role),
      status: statusFor(role),
      start,
      end,
      dept,
      event: cell(row, col.event) || "No event",
    });
  });

  if (hiddenNotes) warnings.push(`${hiddenNotes} more parse notes.`);

  if (!drafts.length) throw new Error("No shifts in that CSV.");

  let min = drafts[0].start.getTime();
  let max = drafts[0].end.getTime();
  for (const shift of drafts) {
    min = Math.min(min, shift.start.getTime());
    max = Math.max(max, shift.end.getTime());
  }
  const origin = startOfMelDay(new Date(min));
  const lastDay = startOfMelDay(new Date(max - 1));
  const dayCount = Math.round((lastDay.getTime() - origin.getTime()) / DAY_MS) + 1;

  const byDept = new Map<string, Map<string, Assignment[]>>();
  for (const shift of drafts) {
    let events = byDept.get(shift.dept);
    if (!events) {
      events = new Map();
      byDept.set(shift.dept, events);
    }
    const list = events.get(shift.event) ?? [];
    list.push(shift);
    events.set(shift.event, list);
  }

  const departments: Department[] = [...byDept.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, events]) => ({
      id: name,
      name,
      events: [...events.entries()]
        .map(([eventName, assignments]) => ({
          id: `${name}\u0000${eventName}`,
          name: eventName,
          assignments: assignments.sort((a, b) => a.start.getTime() - b.start.getTime()),
        }))
        .sort((a, b) => {
          if (a.name === "No event") return 1;
          if (b.name === "No event") return -1;
          const startA = a.assignments[0]?.start.getTime() ?? 0;
          const startB = b.assignments[0]?.start.getTime() ?? 0;
          return startA - startB || a.name.localeCompare(b.name);
        }),
    }));

  return { departments, origin, dayCount, shiftCount: drafts.length, fileName, warnings };
}
