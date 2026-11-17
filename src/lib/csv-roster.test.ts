import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { parseRosterCsv } from "./csv-roster.ts";
import { edgeFor, formatClock, melParts, toneForRole } from "./roster.ts";

const csv = readFileSync(new URL("../../public/roster.csv", import.meta.url), "utf8");

describe("parseRosterCsv", () => {
  const roster = parseRosterCsv(csv, "export.csv");

  it("loads the TimeTarget week", () => {
    assert.equal(roster.shiftCount, 1097);
    assert.equal(roster.departments.length, 23);
    assert.equal(roster.dayCount, 8);
    const first = melParts(roster.origin);
    assert.equal(first.day, 16);
    assert.equal(first.month, 10);
  });

  it("marks blank and numbered names as open, and cancelled as unconfirmed", () => {
    const shifts = roster.departments.flatMap((dept) => dept.events.flatMap((event) => event.assignments));
    const open = shifts.filter((shift) => edgeFor(shift.employee, shift.status) === "open");
    const cancelled = shifts.filter((shift) => shift.status === "unconfirmed");
    assert.equal(open.length, 98);
    assert.equal(cancelled.length, 22);
    assert.equal(toneForRole("AV Technician"), "av");
    assert.equal(toneForRole("Audio L2"), "audio");
    assert.equal(toneForRole("Vision L2"), "vision");
    assert.equal(toneForRole("Lighting L2"), "lighting");
    assert.equal(toneForRole("Driver MR"), "logistics");
    assert.equal(toneForRole("Truck"), "logistics");
    assert.equal(toneForRole("DES vMix Operator"), "vision");
    assert.equal(toneForRole("Technical Director Production"), "director");
    assert.equal(toneForRole("Camera Operator"), "camera");
    assert.equal(toneForRole("Crewleader"), "other");
  });

  it("rolls an overnight finish onto the next morning", () => {
    const adam = roster.departments
      .flatMap((dept) => dept.events.flatMap((event) => event.assignments))
      .find((shift) => shift.employee === "Adam Harrison");
    assert.ok(adam);
    assert.equal(formatClock(adam.end), "00:30");
    assert.equal(melParts(adam.end).day, 23);
  });
});
