import { formatDurationMMSS } from "./format";

describe("formatDurationMMSS", () => {
  test("formats minutes and seconds", () => {
    const input = 177889;
    const expected = "2:58";
    expect(formatDurationMMSS(input)).toBe(expected);
  });

  test("formats minutes and seconds with leading zero", () => {
    const input = 300840;
    const expected = "5:01";
    expect(formatDurationMMSS(input)).toBe(expected);
  });

  test("formats seconds", () => {
    const input = 5000;
    const expected = "0:05";
    expect(formatDurationMMSS(input)).toBe(expected);
  });
});
