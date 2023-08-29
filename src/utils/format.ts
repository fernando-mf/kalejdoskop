import { CamelotTransition, MusicalKey, MusicalKeyMode } from "~/lib/analyzer";

export function formatDurationMMSS(durationMs: number) {
  const duration = Math.ceil(durationMs / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatDurationHHMMSS(durationMs: number) {
  const duration = Math.ceil(durationMs / 1000);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatMusicalKey(key: MusicalKey): string {
  const note = key.note.replace("#", "♯").replace("b", "♭");
  const tail = key.mode === MusicalKeyMode.Minor ? "m" : "";
  return `${note}${tail}`;
}

export function formatCamelotTransitionEmoji(transition: CamelotTransition): string {
  const format: Record<CamelotTransition, string> = {
    [CamelotTransition.PerfectMatch]: "✅",
    [CamelotTransition.MoodChange]: "🔄",
    [CamelotTransition.EnergyBoostLow]: "⚡️",
    [CamelotTransition.EnergyBoostModerate]: "⚡️⚡️",
    [CamelotTransition.EnergyBoostHigh]: "⚡️⚡️⚡️",
    [CamelotTransition.EnergyDropLow]: "🔻",
    [CamelotTransition.EnergyDropModerate]: "🔻🔻",
    [CamelotTransition.EnergyDropHigh]: "🔻🔻🔻",
    [CamelotTransition.Unknown]: "🚫",
  };

  return format[transition];
}
