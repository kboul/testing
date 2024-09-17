import replaceCamelWithSpaces from "./index";

describe("replaceCamelWithSpaces", () => {
  test("Works for no inner capital letter", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightVioletRed")).toBe(
      "Midnight Violet Red"
    );
  });
});
