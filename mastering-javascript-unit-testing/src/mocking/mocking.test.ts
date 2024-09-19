import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "./mocking.js";
import { getExchangeRate } from "../lib/getExchangeRate.js";
import { getShippingQuote } from "../lib/getShippingQuote.js";
import { trackPageView } from "../lib/trackPageView.js";
import { charge } from "../lib/charge.js";
import { sendEmail } from "../lib/email.js";
import security from "../lib/security.js";

describe("mock suite", () => {
  it("mock test case", () => {
    const greet = vi.fn();
    // greet.mockReturnValue("Hello World");
    // greet.mockResolvedValue("Hello World"); // for promises
    greet.mockImplementation((name) => "Hello " + name);
    greet("Kostas");
    expect(greet).toHaveBeenCalledWith("Kostas");
  });
});

describe("sendMessage", () => {
  it("should send a message", () => {
    const sendMessage = vi.fn();
    sendMessage.mockReturnValue("ok");

    expect(sendMessage()).toBe("ok");
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
  });
});

// we suppose the getExchangeRate function is imported from a library and we mock it
// this line is hoisted, meaning it is executed first before all the imports
vi.mock("../lib/getExchangeRate.js");

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

vi.mock("../lib/getShippingQuote.js");

describe("getShippingQuote", () => {
  it("should return shipping not available if quote is an empty string", () => {
    vi.mocked(getShippingQuote).mockReturnValue("");

    expect(getShippingInfo("London")).toMatch(/not available/i);
  });

  it("should return shipping cost and estimated days if destination is not empty string", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    expect(getShippingInfo("US")).toMatch("10");
    expect(getShippingInfo("US")).toMatch(/2 days/i);
  });
});

vi.mock("../lib/trackPageView.js");

describe("renderPage", () => {
  it("should return correct content", async () => {
    const content = await renderPage();
    expect(content).toMatch(/content/i);
  });

  it("should call trackPageView function", async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

vi.mock("../lib/charge.js");

describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };

  // not sure if this is neccessary here because we test submitOrder function and we mock charge function
  it("should charge the customer", () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" }); // mockResolve because it returns a promise

    expect(charge).not.toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success false and payment error if the payment is not successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" }); // mockResolve because it returns a promise

    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: false, error: "payment_error" });
  });

  it("should return success if the payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: true });
  });
});

// Partial mocking
vi.mock("../lib/email.js", async (importOriginal: any) => {
  const originalModule = await importOriginal();
  return { ...originalModule, sendEmail: vi.fn() };
});

describe("signUp", () => {
  // beforeEach(() => {
  //   // clear mock calls before each test
  //   // vi.mocked(sendEmail).mockClear();
  //   // or
  //   // vi.clearAllMocks();
  // });

  const validEmail = "kostas@gmail.com";

  it("should return false if email is invalid", async () => {
    const result = await signUp("invalid-email");
    expect(result).toBeFalsy();
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(validEmail);
    expect(result).toBeTruthy();
  });

  it("should send the welcome email if email is valid", async () => {
    await signUp(validEmail);
    expect(sendEmail).toHaveBeenCalledOnce();

    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(validEmail);
    expect(args[1]).toMatch(/welcome/i);
  });
});

describe("login", () => {
  it("should email the one-time login code", async () => {
    const email = "name@domain.com";
    const spy = vi.spyOn(security, "generateCode");
    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

describe("isOnline", () => {
  it("should return false if current hour is outside opening hours", () => {
    vi.setSystemTime("2024-01-01 07:59");
    expect(isOnline()).toBeFalsy();

    vi.setSystemTime("2024-01-01 20:01");
    expect(isOnline()).toBeFalsy();
  });

  it("should return true if current hour is within opening hours", () => {
    vi.setSystemTime("2024-01-01 10:00");
    expect(isOnline()).toBeTruthy();

    vi.setSystemTime("2024-01-01 19:59");
    expect(isOnline()).toBeTruthy();
  });
});
