function max(a: number, b: number) {
  return a > b ? a : b;
}

function fizBuzz(n: number) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

function calculateAverage(numbers: number[]) {
  if (numbers.length === 0) return NaN;
  return numbers.reduce((sum, current) => current + sum, 0) / numbers.length;
}

function factorial(number: number) {
  if (number < 0) return undefined;
  if (number === 0) return 1;

  const numArray: number[] = Array(Number(number))
    .fill(undefined)
    .map((_, i) => i + 1);

  return numArray.reduce((prevValue, currentValue) => {
    return prevValue * currentValue;
  }, 1);

  // or return n * factorial(n-1)
}

// Loose and tight assertions
function getCoupons() {
  return [
    { code: "SAVE20NOW", discount: 0.2 },
    { code: "DISCOUNT50OFF", discount: 0.5 }
  ];
}

// positive and negative testing
function calculateDiscount(price: number, discountCode: string) {
  if (typeof price !== "number" || price <= 0) return "Invalid price";

  if (typeof discountCode !== "string") return "Invalid discount code";

  let discount = 0;
  if (discountCode === "SAVE10") discount = 0.1;
  else if (discountCode === "SAVE20") discount = 0.2;

  return price - price * discount;
}

// Exercise: positive and negative testing
function validateUserInput(username: string, age: number) {
  const errors = [];

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 255
  )
    errors.push("Invalid username");

  if (typeof age !== "number" || age < 18 || age >= 100)
    errors.push("Invalid age");

  return errors.length === 0 ? "Validation successful" : errors.join(", ");
}

function isPriceInRange(price: number, min: number, max: number) {
  return price >= min && price <= max;
}

function isValidUsername(username: string) {
  const minLength = 5;
  const maxLength = 15;

  return username.length >= minLength && username.length <= maxLength;
}

function canDrive(age: number, countryCode: string) {
  const legalDrivingAge: { [key: string]: number } = {
    US: 16,
    UK: 17
  };

  if (!legalDrivingAge[countryCode]) return "Invalid country code";

  return age >= legalDrivingAge[countryCode];
}

export {
  calculateAverage,
  calculateDiscount,
  canDrive,
  factorial,
  fizBuzz,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  max,
  validateUserInput
};
