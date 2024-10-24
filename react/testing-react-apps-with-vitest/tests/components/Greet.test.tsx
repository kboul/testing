import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";

import Greet from "../../src/components/Greet";

describe("GreetComponent", () => {
  it("should render hello with the name when name is provided", () => {
    render(<Greet name="John" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/john/i);
  });

  it("should render login btn if the name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
