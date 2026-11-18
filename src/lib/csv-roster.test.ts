import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseRosterCsv, parseRosterXlsx } from "./csv-roster.ts";
import { colorForRole } from "./role-colors.ts";
import { edgeFor, formatClock, isoMelDay, melParts, toneForRole, windowForRange } from "./roster.ts";
import * as XLSX from "xlsx";

const csv = `Date,Start Time,End Time,Employee Roster Name,Department,Event,Function,Role
16/11/2026,14:00,18:00,Alex Example,VIC-Example,1001 - Sample Event,Set Up,Audio L2
16/11/2026,22:00,01:00,Alex Example,VIC-Example,1001 - Sample Event,Show,Lighting L2
16/11/2026,09:00,12:00,,VIC-Example,,Pack Down,AV Technician
16/11/2026,09:00,12:00,0 DO NOT CREW,VIC-Example,1001 - Sample Event,Set Up,Vision L2
16/11/2026,10:00,11:00,Alex Example,VIC-Example,1001 - Sample Event,Set Up,Cancelled Shift - UNPAID
16/11/2026,08:00,16:00,Alex Example,VIC-Example,1001 - Sample Event,,Driver MR
`;

describe("parseRosterCsv", () => {
  const roster = parseRosterCsv(csv, "export.csv");
  const shifts = roster.departments.flatMap((dept) => dept.events.flatMap((event) => event.assignments));

  it("groups a small export by department and event", () => {
    assert.equal(roster.shiftCount, 6);
    assert.equal(roster.departments.length, 1);
    assert.equal(roster.departments[0].name, "VIC-Example");
    assert.equal(roster.dayCount, 2);
    const first = melParts(roster.origin);
    assert.equal(first.day, 16);
    assert.equal(first.month, 10);
  });

  it("marks blank and numbered names as open, and cancelled shifts as dark-grey unconfirmed", () => {
    const open = shifts.filter((shift) => edgeFor(shift.employee, shift.status) === "open");
    const cancelled = shifts.filter((shift) => shift.role.startsWith("Cancelled"));
    assert.equal(open.length, 2);
    assert.equal(cancelled.length, 1);
    assert.equal(cancelled[0].tone, "cancelled");
    assert.equal(cancelled[0].status, "unconfirmed");
    assert.equal(toneForRole("Cancelled Shift - UNPAID"), "cancelled");
    assert.equal(toneForRole("RDO"), "cancelled");
    assert.equal(toneForRole("Audio L2"), "audio");
    assert.equal(toneForRole("Vision L2"), "vision");
    assert.equal(toneForRole("Lighting L2"), "lighting");
    assert.equal(toneForRole("Driver MR"), "logistics");
    assert.equal(toneForRole("Test and Tag"), "logistics");
    assert.equal(toneForRole("Test & Tag"), "logistics");
    assert.equal(toneForRole("AV Technician"), "av");
    assert.equal(colorForRole("Test and Tag"), "#dd00dd");
    assert.equal(colorForRole("Test & Tag Assist"), "#9ba4c0");
    assert.equal(colorForRole("Warehouse"), "#f92877");
    assert.equal(colorForRole("Audio L2"), "#ff5959");
    assert.equal(colorForRole("RDO"), "#696969");
    assert.equal(colorForRole("Lighting L2"), "#359aff");
  });

  it("rolls an overnight finish onto the next morning", () => {
    const overnight = shifts.find((shift) => shift.role === "Lighting L2");
    assert.ok(overnight);
    assert.equal(formatClock(overnight.end), "01:00");
    assert.equal(melParts(overnight.end).day, 17);
  });
});

describe("windowForRange", () => {
  const origin = new Date(Date.UTC(2026, 10, 15, 13));

  it("stays on the full span when both dates are empty", () => {
    const window = windowForRange(origin, 8, "", "");
    assert.equal(window.filtered, false);
    assert.equal(window.dayCount, 8);
    assert.equal(window.origin, origin);
  });

  it("keeps an inclusive from/to range", () => {
    const window = windowForRange(origin, 30, "2026-11-18", "2026-11-19");
    assert.equal(window.filtered, true);
    assert.equal(window.dayCount, 2);
    assert.equal(isoMelDay(window.origin), "2026-11-18");
  });
});

describe("parse problems", () => {
  const csv = `Date,Start Time,End Time,Employee Roster Name,Department,Event,Function,Role
16/11/2026,14:00,18:00,False,TIO,1001 - Sample,Set Up,Audio L2
16/11/2026,15:00,18:00,{7CFAE39E-E5ED-4F5D-B490-5260AFF82D4B},3x Laptops,1001 - Sample,Set Up,Audio L2
16/11/2026,14:00,18:00,Alex "Al" Example,VIC-Example,1001 - Sample,Set Up,Audio L2
not-a-date,14:00,18:00,Alex Example,VIC-Example,1001 - Sample,Set Up,Audio L2
`;

  it("drops boolean names, ids, and values that are not departments", () => {
    const roster = parseRosterCsv(csv);
    const shifts = roster.departments.flatMap((dept) =>
      dept.events.flatMap((event) => event.assignments.map((shift) => ({ ...shift, dept: dept.name }))),
    );
    assert.equal(shifts.length, 3);
    assert.ok(shifts.every((shift) => shift.employee !== "False"));
    assert.ok(shifts.every((shift) => !shift.employee.includes("7CFAE39E")));
    assert.deepEqual(
      roster.departments.map((dept) => dept.name),
      ["No department", "VIC-Example"],
    );
    const named = shifts.find((shift) => shift.employee.startsWith("Alex"));
    assert.equal(named?.employee, 'Alex "Al" Example');
    assert.ok(roster.warnings.some((note) => note.includes("False")));
    assert.ok(roster.warnings.some((note) => note.includes("TIO")));
    assert.ok(roster.warnings.some((note) => note.includes("3x Laptops")));
    assert.ok(roster.warnings.some((note) => note.includes("skipped")));
  });
});

describe("parseRosterXlsx", () => {
  it("reads roster names, status, comments and function comments from the wide export", () => {
    const sheet = XLSX.utils.aoa_to_sheet([
      [
        "Employee",
        "Employee Roster Name",
        "Date",
        "Start Time",
        "End Time",
        "Status",
        "Department",
        "Role",
        "Event",
        "Function",
        "Comments",
        "Function Comments",
        "Published",
        "GuidKey",
      ],
      [
        "Christopher Ruffles",
        "Chris Ruffles",
        new Date(Date.UTC(2026, 10, 16)),
        "08:30:00",
        "12:00:00",
        "Unconfirmed",
        "VIC-CENTREPIECE",
        "Audio L2",
        "0995665 - GH2&3 | We Are Carlisle",
        "Operate",
        "Bring the spare laptop",
        "Salesperson : Courtney Beggs",
        "False",
        "{7CFAE39E-E5ED-4F5D-B490-5260AFF82D4B}",
      ],
    ]);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Roster");
    const bytes = XLSX.write(book, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
    const roster = parseRosterXlsx(bytes, "export.xlsx");
    const shift = roster.departments[0]?.events[0]?.assignments[0];
    assert.ok(shift);
    assert.equal(shift.employee, "Chris Ruffles");
    assert.equal(shift.status, "unconfirmed");
    assert.equal(shift.comment, "Bring the spare laptop");
    assert.equal(shift.fnComment, "Salesperson : Courtney Beggs");
    assert.equal(shift.role, "Audio L2");
    assert.equal(melParts(shift.start).day, 16);
    assert.equal(roster.departments[0].name, "VIC-CENTREPIECE");
  });
});

