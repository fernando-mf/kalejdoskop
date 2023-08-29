import { containNumber } from "@/utils/math";
import { MusicalKey, MusicalKeyMode, MusicalNote } from "~/lib/analyzer/key";

const CAMELOT_MIN = 1;
const CAMELOT_MAX = 12;

type CamelotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type CamelotLetter = "A" | "B";
export type CamelotKey = `${CamelotNumber}${CamelotLetter}`;

const CAMELOT_REGEX = /^([1-9]|10|11|12)([AB])$/;

const MUSICAL_KEY_CAMELOT_MAPPING: Record<MusicalKeyMode, Record<MusicalNote, CamelotKey>> = {
  [MusicalKeyMode.Major]: {
    B: "1B",
    "F#": "2B",
    Db: "3B",
    "G#": "4B",
    Eb: "5B",
    Bb: "6B",
    F: "7B",
    C: "8B",
    G: "9B",
    D: "10B",
    A: "11B",
    E: "12B",
  },
  [MusicalKeyMode.Minor]: {
    "G#": "1A",
    Eb: "2A",
    Bb: "3A",
    F: "4A",
    C: "5A",
    G: "6A",
    D: "7A",
    A: "8A",
    E: "9A",
    B: "10A",
    "F#": "11A",
    Db: "12A",
  },
};

export function isCamelotKey(s: string): s is CamelotKey {
  return CAMELOT_REGEX.test(s);
}

export class Camelot {
  key: CamelotKey;
  number: CamelotNumber;
  letter: CamelotLetter;

  constructor(key: CamelotKey) {
    const match = key.match(CAMELOT_REGEX)!;

    this.key = key;
    this.number = parseInt(match[1]) as CamelotNumber;
    this.letter = match[2] as CamelotLetter;
  }

  static FromString(key: string): Camelot | null {
    if (!isCamelotKey(key)) {
      return null;
    }

    return new Camelot(key);
  }

  static FromMusicalKey(key: MusicalKey): Camelot {
    const camelotKey = MUSICAL_KEY_CAMELOT_MAPPING[key.mode][key.note];
    return new Camelot(camelotKey);
  }

  isMinor(): boolean {
    return this.letter === "A";
  }
}

export function camelotKeyToMinor(camelot: Camelot): CamelotKey {
  return `${camelot.number}A`;
}

export function camelotKeyToMajor(camelot: Camelot): CamelotKey {
  return `${camelot.number}B`;
}

export function camelotKeyAdd(camelot: Camelot, n: number, targetLetter?: CamelotLetter): CamelotKey {
  const num = containNumber(camelot.number + n, CAMELOT_MIN, CAMELOT_MAX) as CamelotNumber;
  const letter = targetLetter ?? camelot.letter;
  return `${num}${letter}`;
}
