import { indexByProp } from "./array";

describe("indexByProp", () => {
  test("should return an empty object when given an empty array", () => {
    type testType = { id: string };
    const input: testType[] = [];
    const expected = {};
    expect(indexByProp(input, "id")).toEqual(expected);
  });

  test("should return an object with the correct keys", () => {
    const input = [
      { id: "first", name: "Jon" },
      { id: "second", name: "Doe" },
    ];
    const expected = {
      first: { id: "first", name: "Jon" },
      second: { id: "second", name: "Doe" },
    };
    expect(indexByProp(input, "id")).toEqual(expected);
  });
});
