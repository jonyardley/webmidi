const Range = require("tonal-range");

module.exports = [
  {
    name: "Violin",
    channel: 1,
    notes: Range.chromatic(["G4", "F7"]),
    tune: "A4"
  },
  {
    name: "Viola",
    channel: 2,
    notes: Range.chromatic(["C3", "E6"]),
    tune: "A3"
  },
  {
    name: "Cello",
    channel: 3,
    notes: Range.chromatic(["C2", "G5"]),
    tune: "A2"
  },
  {
    name: "Double Bass",
    channel: 4,
    notes: Range.chromatic(["C1", "C4"]),
    tune: "A1"
  },
  {
    name: "Flute",
    channel: 5,
    notes: Range.chromatic(["C6", "D7"]),
    tune: "A5"
  },
  {
    name: "Oboe",
    channel: 6,
    notes: Range.chromatic(["B3", "C6"]),
    tune: "A4"
  },
  {
    name: "Clarinet",
    channel: 7,
    notes: Range.chromatic(["D3", "G6"]),
    tune: "A4"
  },
  {
    name: "Trumpet",
    channel: 8,
    notes: Range.chromatic(["C4", "C6"]),
    tune: "A4"
  },
  {
    name: "Trombone",
    channel: 9,
    notes: Range.chromatic(["C2", "G4"]),
    tune: "A3"
  },
  {
    name: "Tuba",
    channel: 10,
    notes: Range.chromatic(["A1", "D4"]),
    tune: "A1"
  },
  {
    name: "French Horn",
    channel: 11,
    notes: Range.chromatic(["C2", "E4"]),
    tune: "A3"
  },
  {
    name: "Piano",
    channel: 12,
    notes: Range.chromatic(["A0", "C8"]),
    tune: "A4"
  },
  {
    name: "Harp",
    channel: 13,
    notes: Range.chromatic(["C3", "C8"]),
    tune: "A4"
  }
];
