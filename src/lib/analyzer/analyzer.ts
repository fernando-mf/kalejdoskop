import {
  CamelotKey,
  Camelot,
  camelotKeyToMajor,
  camelotKeyToMinor,
  camelotKeyAdd,
} from "./camelot";

type EnergyIntensity = {
  low: CamelotKey[];
  moderate: CamelotKey[];
  high: CamelotKey[];
};

export type AnalyzerResult = {
  perfectMatch: CamelotKey[];
  moodChange: CamelotKey;
  energyBoost: EnergyIntensity;
  energyDrop: EnergyIntensity;
};

function processMinor(camelot: Camelot): AnalyzerResult {
  return {
    perfectMatch: [camelot.key, camelotKeyAdd(camelot, -1, "B")],
    moodChange: camelotKeyAdd(camelot, 3, "B"),
    energyBoost: {
      low: [camelotKeyToMajor(camelot), camelotKeyAdd(camelot, 1)],
      moderate: [camelotKeyAdd(camelot, -3)],
      high: [camelotKeyAdd(camelot, 2), camelotKeyAdd(camelot, -5)],
    },
    energyDrop: {
      low: [camelotKeyAdd(camelot, -1)],
      moderate: [camelotKeyAdd(camelot, 3)],
      high: [camelotKeyAdd(camelot, -2), camelotKeyAdd(camelot, -7)],
    },
  };
}

function processMajor(camelot: Camelot): AnalyzerResult {
  return {
    perfectMatch: [camelot.key, camelotKeyAdd(camelot, 1, "A")],
    moodChange: camelotKeyAdd(camelot, -3, "A"),
    energyBoost: {
      low: [camelotKeyAdd(camelot, 1)],
      moderate: [camelotKeyAdd(camelot, 9)],
      high: [camelotKeyAdd(camelot, 2), camelotKeyAdd(camelot, 7)],
    },
    energyDrop: {
      low: [camelotKeyToMinor(camelot), camelotKeyAdd(camelot, 11)],
      moderate: [camelotKeyAdd(camelot, 3)],
      high: [camelotKeyAdd(camelot, 10), camelotKeyAdd(camelot, 5)],
    },
  };
}

export function analyze(key: CamelotKey): AnalyzerResult {
  const camelot = new Camelot(key);
  if (camelot.isMinor()) {
    return processMinor(camelot);
  }
  return processMajor(camelot);
}
