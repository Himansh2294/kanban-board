import { render } from "@testing-library/react";
import KanbanColumn from "./KanbanColumn";

test("renders Kanban Board", () => {
  const spy = jest.spyOn(global.console, "error");
  render(<KanbanColumn />);
  expect(spy).not.toHaveBeenCalled();
});
