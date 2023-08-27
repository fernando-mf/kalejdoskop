import { containNumber } from "./math";

describe("containNumber", () => {
  test("preserves the same number if it is within the range", () => {
    expect(containNumber(0, 0, 6)).toBe(0);
    expect(containNumber(6, 0, 6)).toBe(6);
    expect(containNumber(5, 1, 10)).toBe(5);
    expect(containNumber(15, 15, 20)).toBe(15);
    expect(containNumber(17, 15, 20)).toBe(17);
    expect(containNumber(20, 15, 20)).toBe(20);
    expect(containNumber(1, 1, 12)).toBe(1);
    expect(containNumber(12, 1, 12)).toBe(12);
  });

  test("supports numbers below range", () => {
    expect(containNumber(0, 1, 12)).toBe(12);
    expect(containNumber(-2, 1, 12)).toBe(10);
    expect(containNumber(-3, 1, 12)).toBe(9);
    expect(containNumber(-11, 1, 12)).toBe(1);
    expect(containNumber(-13, 1, 12)).toBe(11);
  });

  test("supports numbers above range", () => {
    expect(containNumber(13, 1, 12)).toBe(1);
    expect(containNumber(14, 1, 12)).toBe(2);
  });
});
