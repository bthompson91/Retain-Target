import { toneForRole, type Assignment, type Department, type ShiftStatus } from "@/lib/roster";

const DAY_MS = 86_400_000;

export function buildRoster(weekStart: Date, todayIndex: number): Department[] {
  const at = (day: number, hour: number, minute = 0) =>
    new Date(weekStart.getTime() + day * DAY_MS + (hour * 60 + minute) * 60_000);

  let n = 0;
  const job = (
    employee: string,
    fn: string,
    role: string,
    day: number,
    sh: number,
    sm: number,
    eh: number,
    em: number,
    endDay = day,
    status: ShiftStatus = "confirmed",
  ): Assignment => ({
    id: `a${++n}`,
    employee,
    fn,
    role,
    tone: toneForRole(role),
    status,
    start: at(day, sh, sm),
    end: at(endDay, eh, em),
    comment: "",
    fnComment: "",
  });

  const ball = todayIndex;
  const yest = todayIndex === 0 ? 0 : todayIndex - 1;

  return [
    {
      id: "base",
      name: "Base - Not available",
      events: [
        {
          id: "blackout",
          name: "House blackout",
          assignments: [job("House", "Unavailable", "Hold", 6, 0, 0, 0, 0, 7)],
        },
      ],
    },
    {
      id: "crown-towers",
      name: "Vic-Crown Towers",
      events: [
        {
          id: "ball",
          name: "1101034 - Grand Ball for Charity",
          assignments: [
            job("Ben Harlow", "Setup", "A1", ball, 13, 0, 17, 0),
            job("James Lindquist", "Setup", "LX L2", ball, 14, 0, 18, 0),
            job("Chris Poulter", "Show", "V1", ball, 16, 0, 23, 0),
            job("Sofia Marin", "Show", "A1", ball, 16, 30, 23, 30, ball, "unconfirmed"),
            job("Amira Cole", "Show", "LX L2", ball, 17, 0, 23, 30),
            job("Unassigned", "Show", "AV", ball, 18, 0, 23, 0),
            job("2 Loader", "Strike", "Loader", ball, 21, 0, 1, 0, ball + 1),
            job("Dana Okonkwo", "Strike", "Driver", ball, 22, 30, 2, 0, ball + 1),
          ],
        },
        {
          id: "crystal",
          name: "1101102 - Crystal Room Rehearsal",
          assignments: [
            job("James Lindquist", "Rehearsal", "LX L2", 0, 9, 0, 13, 0),
            job("Priya Shah", "Rehearsal", "A2", 0, 9, 0, 13, 0, 0, "unconfirmed"),
            job("Tom Allsop", "Focus", "Technical Director", 0, 10, 0, 12, 30),
          ],
        },
        {
          id: "bump",
          name: "1101216 - Ballroom Bump-in",
          assignments: [
            job("James Lindquist", "Bump-in", "LX L2", 3, 8, 0, 12, 0),
            job("Simon-Peter Ellis", "Bump-in", "Warehouse", 3, 8, 0, 16, 0),
            job("Jacob Messina", "Pre-rig", "Camera", 3, 9, 0, 15, 0),
          ],
        },
      ],
    },
    {
      id: "crown-rental",
      name: "Crown - Rental Job",
      events: [
        {
          id: "andrea",
          name: "Andrea & Kevin Wedding",
          assignments: [
            job("Jef Frisina", "Show", "LX L2", 5, 15, 0, 23, 0),
            job("Jon Bargen", "Show", "A1", 5, 14, 0, 23, 30),
            job("Elizabet Okoye", "Show", "DES", 5, 16, 0, 23, 0),
          ],
        },
        {
          id: "anna",
          name: "Anna and Peter Wedding Reception",
          assignments: [
            job("Aaron Fabrikan", "Show", "A1", 5, 17, 0, 23, 30),
            job("Alan Dawson", "Show", "LX L2", 5, 16, 0, 23, 0, 5, "unconfirmed"),
            job("Christopher Ruffles", "Show", "SX", 5, 16, 0, 23, 30),
          ],
        },
        {
          id: "officemax",
          name: "OfficeMax Sales Expo",
          assignments: [
            job("Jarod Lugowski", "Show", "A1", 4, 9, 0, 17, 0),
            job("Sam Holt", "Show", "A2", 4, 9, 0, 17, 0),
            job("Zac Barraclough", "Show", "LX L2", 4, 9, 0, 17, 0),
            job("Aaron Fabrikan", "Strike", "A1", 4, 17, 0, 20, 0),
          ],
        },
      ],
    },
    {
      id: "hyatt",
      name: "Park Hyatt - Rental Job",
      events: [
        {
          id: "chao",
          name: "Chao Yang's Chinese Wedding",
          assignments: [
            job("Jeff Armstrong", "Show", "V1", yest, 16, 0, 22, 30),
            job("Mei Lang", "Show", "A1", yest, 16, 0, 22, 30),
          ],
        },
        {
          id: "shania",
          name: "Shania's Baby Shower",
          assignments: [job("Luke Serrano", "Show", "A2", ball, 11, 0, 15, 0)],
        },
      ],
    },
    {
      id: "mcg",
      name: "MCG - Various",
      events: [
        {
          id: "one-heart",
          name: "One Heart",
          assignments: [
            job("Simone Adey", "Show", "LX L2", 4, 18, 0, 23, 0),
            job("Katie Nguyen", "Show", "A1", 4, 18, 0, 23, 0),
          ],
        },
        {
          id: "compounds",
          name: "Professional Compounds",
          assignments: [job("Simone Adey", "Bump-in", "LX L1", 5, 8, 0, 12, 0)],
        },
      ],
    },
    {
      id: "training",
      name: "Training",
      events: [
        {
          id: "katie",
          name: "Trainee Katie Ciesiolka",
          assignments: [job("Katie Ciesiolka", "Training", "Trainee", 3, 8, 0, 18, 0, 4)],
        },
        {
          id: "shadow",
          name: "Shadow jarod",
          assignments: [job("Jarod Holt", "Shadow", "LX L2", ball, 9, 0, 17, 0, ball, "unconfirmed")],
        },
      ],
    },
  ];
}
