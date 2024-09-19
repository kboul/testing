import { describe, expect, it, vi } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "./mocking.js";
import { getExchangeRate } from "../../lib/getExchangeRate.js";
import { getShippingQuote } from "../../lib/getShippingQuote.js";

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
vi.mock("../../lib/getExchangeRate.js");

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

vi.mock("../../lib/getShippingQuote.js");

describe('getShippingQuote', () => {
  it('should return shipping not available if quote is an empty string', () => {
    vi.mocked(getShippingQuote).mockReturnValue("");

    expect(getShippingInfo("London")).toMatch(/not available/i);
  })

  it('should return shipping cost and estimated days if destination is not empty string', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    expect(getShippingInfo("US")).toMatch("10");
    expect(getShippingInfo("US")).toMatch(/2 days/i);
  })
})