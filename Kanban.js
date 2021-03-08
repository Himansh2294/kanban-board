import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";
import TextForm from "./TextForm";

let _taskId = 0;

const tasksList = Array.from({length: 5}).map(() => ({
  id: ++_taskId,
  title: `Task ${_taskId}`,
  status:'backlog'
}));

const channels = ["backlog", "new", "wip", "review", "done"];
const labelsMap = {
  backlog: "Backlog",
  new: "To Do",
  wip: "In Progress",
  review: "Review",
  done: "Done",
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "lightgray",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "darkgray",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "cornflowerblue",
  },
};

const Kanban = () => {
  const [tasks, setTaskStatus] = useState(tasksList);

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task._id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
      setTaskStatus(newTasks);
    },
    [tasks]
  );

  const addtask = (value) => {
    setTaskStatus([
      ...tasks,
      {
        _id: tasks.length + 1,
        title: value,
        status: "backlog",
      },
    ]);
  };

  return (
    <main>
      <h2> Kanban </h2>
      <DndProvider backend={HTML5Backend}>
        <section style={classes.board}>
          {channels.map((channel) => (
            <KanbanColumn
              key={channel}
              status={channel}
              changeTaskStatus={changeTaskStatus}
            >
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks &&
                    tasks
                      .filter((item) => item.status === channel)
                      .map((item) => (
                        <>
                          <KanbanItem key={item._id} id={item._id}>
                            <div style={classes.item}>{item.title}</div>
                          </KanbanItem>
                        </>
                      ))}
                </div>

                {channel === "backlog" && (
                  <TextForm onSubmit={addtask} placeholder={" Add task..."} />
                )}
              </div>
            </KanbanColumn>
          ))}
        </section>
      </DndProvider>
    </main>
  );
};

export default Kanban;
