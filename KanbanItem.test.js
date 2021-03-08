import { render } from "@testing-library/react";
import KanbanItem from "./KanbanItem";

test("renders Kanban Board", () => {
  const spy = jest.spyOn(global.console, "error");
  render(<KanbanItem />);
  expect(spy).not.toHaveBeenCalled();
});
