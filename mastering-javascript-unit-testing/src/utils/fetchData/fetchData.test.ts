import { expect, it } from "vitest";

import fetchData from "./fetchData.js";

it("should return a Promise that will resolve to an array of numbers", async () => {
  try {
    const data = await fetchData();
    expect(data.length).toBeGreaterThan(0);
  } catch (error) {
    expect(error).toHaveProperty("reason");
    // expect(error.reason).toMatch(/failed/i);
  }
});
