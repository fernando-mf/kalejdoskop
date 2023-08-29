export type MusicalNote =
  | "C"
  | "Db"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "Bb"
  | "B";

export enum MusicalKeyMode {
  Major = 1,
  Minor = 0,
}

export type MusicalKey = {
  note: MusicalNote;
  mode: MusicalKeyMode;
};

const PITCH_CLASS_TO_NOTE_MAPPING: Record<number, MusicalNote> = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "Bb",
  11: "B",
};

export function musicalKeyFromPitchClass(
  pitch: number,
  mode: MusicalKeyMode,
): MusicalKey {
  const note = PITCH_CLASS_TO_NOTE_MAPPING[pitch];
  if (!note) {
    throw new Error(`Invalid pitch class: ${pitch}`);
  }

  return { note, mode };
}
