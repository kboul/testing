import { describe, expect, it, test } from "vitest";

import {
  calculateAverage,
  calculateDiscount,
  canDrive,
  factorial,
  fizBuzz,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  max,
  validateUserInput,
} from "./utils.js";

describe("max", () => {
  test("should return the first argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });

  test("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  test("should return one of the 2 arguments if both are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("fizzBuzz", () => {
  test("should return FizzBuzz if the argument is divided by 3 and 5 at the same time", () => {
    expect(fizBuzz(15)).toBe("FizzBuzz");
  });

  test("should return Fizz if the argument is divided only by 3 ", () => {
    expect(fizBuzz(9)).toBe("Fizz");
  });

  test("should return Buzz if the argument is divided only by 5 ", () => {
    expect(fizBuzz(5)).toBe("Buzz");
  });

  test("should return the passed argument as a string in any other case", () => {
    expect(fizBuzz(2)).toBe("2");
  });
});

describe("calculateAverage", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should calculate the avg of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should calculate the avg of an array with two elements", () => {
    expect(calculateAverage([1, 3])).toBe(2);
  });

  it("should calculate the avg of an array with three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });

  describe("factorial", () => {
    it("should return undefined if the argument is -1", () => {
      expect(factorial(-1)).toBe(undefined);
    });

    it("should return 1 if the argument is 0", () => {
      expect(factorial(0)).toBe(1);
    });

    it("should return 1 if the argument is 1", () => {
      expect(factorial(1)).toBe(1);
    });

    it("should return 2 if the argument is 2", () => {
      expect(factorial(2)).toBe(2);
    });

    it("should return 6 if the argument is 3", () => {
      expect(factorial(3)).toBe(6);
    });

    it("should return 24 if the argument is 4", () => {
      expect(factorial(4)).toBe(24);
    });
  });
});

describe("getCoupons", () => {
  it("returns an array that is not empty", () => {
    expect(getCoupons().length).toBeGreaterThan(0);
  });

  it("contains property code and discount on each object", () => {
    getCoupons().forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(coupon).toHaveProperty("discount");
    });
  });

  it("property code is a string and discount a number ranging between 0 and 1", () => {
    getCoupons().forEach((coupon) => {
      expect(typeof coupon.code).toBe("string");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  // negative tests
  it("should return invalid if username is shorter than 3characters", () => {
    expect(validateUserInput("ab", 18)).toMatch(/invalid/i);
  });

  it("should return validation invalid if username exceeds 255 characters", () => {
    expect(validateUserInput("A".repeat(256), 42)).toMatch(/invalid/i);
  });

  it("should return invalid if age is less than 18", () => {
    expect(validateUserInput("abc", 17)).toMatch(/invalid/i);
  });

  it("should return invalid if age is bigger than 100", () => {
    expect(validateUserInput("abc", 100)).toMatch(/invalid/i);
  });

  it("should return validation successful if both inputs are valid", () => {
    expect(validateUserInput("A", 100)).toMatch(/invalid/i);
  });

  // positive test
  it("should return validation successful if both inputs are valid", () => {
    expect(validateUserInput("abc", 20)).toMatch(/success/i);
  });
});

describe("isPriceInRange", () => {
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price > max", price: 200, result: false },
    // Boundary tests
    { scenario: "price = min", price: 20, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > min", price: 25, result: true },
    { scenario: "price between min & max", price: 50, result: true },
  ])(`should return $result when $scenario`, ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });

  // parameterized tests
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price > max", price: 200, result: false },
    { scenario: "price = min", price: 20, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > min", price: 25, result: true },
    { scenario: "price > max", price: 120, result: false },
    { scenario: "min within range", price: 50, result: true },
    { scenario: "max within range", price: 80, result: true },
  ])(`should return $result when $scenario`, ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

describe("isValidUsername", () => {
  it("should return false if username is shorter than 5 chars or bigger than 15 chars", () => {
    expect(isValidUsername("abcd")).toBeFalsy();
    expect(isValidUsername("a".repeat(16))).toBeFalsy();
  });

  it("should return true if username is 5 chars and above or 15 chars and below", () => {
    expect(isValidUsername("abcde")).toBeTruthy();
    expect(isValidUsername("abcdef")).toBeTruthy();
    expect(isValidUsername("a".repeat(10))).toBeTruthy();
    expect(isValidUsername("a".repeat(15))).toBeTruthy();
  });
});

describe("canDrive", () => {
  // it("should be able to drive in US if age is 16", () => {
  //   expect(canDrive(16, "US")).toBeTruthy();
  // });

  // parameterized test
  it.each([
    { age: 16, country: "US", result: true },
    { age: 5, country: "US", result: false },
    { age: 5, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
  ])(
    "should return $result for ($age, $country)",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    }
  );

  // it("should return error if driver is younger in US than 16", () => {
  //   expect(canDrive(5, "US")).toBeFalsy();
  // });

  it("should return error if code is invalid in US", () => {
    expect(canDrive(16, "USA")).toMatch(/invalid/i);
  });

  it("should return error if code is invalid in UK", () => {
    expect(canDrive(16, "UKG")).toMatch(/invalid/i);
  });

  // it("should not be able to drive in UK if age is 5", () => {
  //   expect(canDrive(5, "UK")).toBeFalsy();
  // });

  // it("should be able to drive in UK if age is 17", () => {
  //   expect(canDrive(17, "UK")).toBeTruthy();
  // });
});
