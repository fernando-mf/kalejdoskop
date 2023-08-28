export function formatDurationMMSS(durationMs: number) {
  const duration = Math.ceil(durationMs / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
