import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseRosterCsv } from "./csv-roster.ts";
import { edgeFor, formatClock, melParts, toneForRole } from "./roster.ts";

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
    assert.equal(toneForRole("Audio L2"), "audio");
    assert.equal(toneForRole("Vision L2"), "vision");
    assert.equal(toneForRole("Lighting L2"), "lighting");
    assert.equal(toneForRole("Driver MR"), "logistics");
    assert.equal(toneForRole("AV Technician"), "av");
  });

  it("rolls an overnight finish onto the next morning", () => {
    const overnight = shifts.find((shift) => shift.role === "Lighting L2");
    assert.ok(overnight);
    assert.equal(formatClock(overnight.end), "01:00");
    assert.equal(melParts(overnight.end).day, 17);
  });
});
