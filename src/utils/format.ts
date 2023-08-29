import { MusicalKey, MusicalKeyMode } from "~/lib/analyzer";

export function formatDurationMMSS(durationMs: number) {
  const duration = Math.ceil(durationMs / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatMusicalKey(key: MusicalKey): string {
  const note = key.note.replace("#", "♯").replace("b", "♭");
  const tail = key.mode === MusicalKeyMode.Minor ? "m" : "";
  return `${note}${tail}`;
}
