import { beforeAll, describe, expect, it } from "vitest";

import Stack from "./Stack.js";

const myArray = [1, 2, 3, 4];

describe("Stack", () => {
  let stack: Stack<number>; // Define stack as Stack<number>

  beforeAll(() => {
    stack = new Stack<number>(); // Instantiate the stack with numbers
  });

  it("should return a Stack instance", () => {
    expect(stack).toBeInstanceOf(Stack);
  });

  it("should return true if stack is empty", () => {
    expect(stack.isEmpty()).toBeTruthy();
  });

  it("should push all items if push method is used", () => {
    [...myArray, 5].forEach((item) => stack.push(item)); // Push items to stack

    expect(stack.size()).toBe(5);
  });

  describe("pop", () => {
    it("should return the last item", () => {
      expect(stack.pop()).toBe(5);
      expect(stack.size()).toBe(4);
    });

    it("should throw an error if size is empty", () => {
      stack.clear();
      expect(() => stack.pop()).toThrowError(/empty/i);
    });
  });

  describe("peek", () => {
    it("should return the last item", () => {
      myArray.forEach((item) => stack.push(item)); // Push items to stack
      expect(stack.peek()).toBe(4);
    });

    it("should throw an error if size is empty", () => {
      stack.clear();
      expect(() => stack.peek()).toThrowError(/empty/i);
    });
  });

  it("should return false if stack is not empty", () => {
    myArray.forEach((item) => stack.push(item)); // Push items to stack
    expect(stack.isEmpty()).toBeFalsy();
  });

  it("should delete all items if clear method is used", () => {
    stack.clear();
    expect(stack.size()).toBe(0);
  });
});
