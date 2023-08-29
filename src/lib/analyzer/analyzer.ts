import { CamelotKey, Camelot, camelotKeyToMajor, camelotKeyToMinor, camelotKeyAdd } from "./camelot";

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

export enum CamelotTransition {
  PerfectMatch,
  MoodChange,
  EnergyBoostLow,
  EnergyBoostModerate,
  EnergyBoostHigh,
  EnergyDropLow,
  EnergyDropModerate,
  EnergyDropHigh,
  Unknown,
}

export function calculateTransition(from: CamelotKey, to: CamelotKey): CamelotTransition {
  const results = analyze(from);

  // Perfect match
  if (results.perfectMatch.includes(to)) {
    return CamelotTransition.PerfectMatch;
  }

  // Mood change
  if (results.moodChange === to) {
    return CamelotTransition.MoodChange;
  }

  // Energy boost
  if (results.energyBoost.low.includes(to)) {
    return CamelotTransition.EnergyBoostLow;
  }
  if (results.energyBoost.moderate.includes(to)) {
    return CamelotTransition.EnergyBoostModerate;
  }
  if (results.energyBoost.high.includes(to)) {
    return CamelotTransition.EnergyBoostHigh;
  }

  // Energy drop
  if (results.energyDrop.low.includes(to)) {
    return CamelotTransition.EnergyDropLow;
  }
  if (results.energyDrop.moderate.includes(to)) {
    return CamelotTransition.EnergyDropModerate;
  }
  if (results.energyDrop.high.includes(to)) {
    return CamelotTransition.EnergyDropHigh;
  }

  return CamelotTransition.Unknown;
}
