import { render, screen } from "@testing-library/react";

import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  const user: User = { name: "John", id: 12 };

  describe("user is not admin", () => {
    beforeEach(() => render(<UserAccount user={user} />));

    it("should always show a header", () => {
      const heading = screen.getByRole("heading");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/user profile/i);
    });

    it("should not show edit button", () => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should show user name always", () => {
      expect(screen.getByText(/name:/i)).toBeInTheDocument();
    });
  });

  describe("user is admin", () => {
    beforeEach(() => render(<UserAccount user={{ ...user, isAdmin: true }} />));

    it("should always show a header", () => {
      const heading = screen.getByRole("heading");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/user profile/i);
    });

    it("should show edit btn", () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/edit/i);
    });
  });
});
