export function modulo(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function containNumber(n: number, min: number, max: number): number {
  return min + modulo(n - min, max - min + 1);
}
