import { render, screen } from "@testing-library/react";
import Posts from ".";

test("initial screen", () => {
  render(<Posts />);

  const noPosts = screen.getByText("No posts", { exact: false });
  expect(noPosts).toBeInTheDocument();

  // console.log(screen.debug());

  const posts = screen.queryByText("list");
  expect(posts).not.toBeInTheDocument();
});
