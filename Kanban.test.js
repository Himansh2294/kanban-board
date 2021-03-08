import { render, screen } from "@testing-library/react";
import Kanban from "./Kanban";

test("renders Kanban Board", () => {
  render(<Kanban />);
  const headerElement = screen.getByText("Kanban");
  expect(headerElement).toBeInTheDocument();
});
