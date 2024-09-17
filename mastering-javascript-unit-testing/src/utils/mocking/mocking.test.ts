import { describe, expect, it, vi } from "vitest";
import { getPriceInCurrency } from "./mocking.js";
import { getExchangeRate } from "../../lib/getExchangeRate.js";

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
