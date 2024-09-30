import { render, screen } from "@testing-library/react";

import UserList from "../../src/components/UserList";

describe("UserList", () => {
  it("should render no users if users are empty", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render all users and when clicking on one it should open a link", () => {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];

    render(<UserList users={users} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: user.name })).toHaveAttribute(
        "href",
        `/users/${user.id}`
      );
    });
  });
});
