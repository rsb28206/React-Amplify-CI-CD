import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { Task } from "./models/Task";
import { nanoid } from "nanoid";

function usePrevious(value: undefined) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface FilterName {
  [key: string]: any;
}

const FILTER_MAP: FilterName = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props: any) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const key: string = filter;

  const taskList = tasks
  .filter(FILTER_MAP[key])
  .map((task: Task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef<HTMLInputElement>(null);
  const prevTaskLength = usePrevious(tasks.length) || 0;

  useEffect(() => {
    if (listHeadingRef.current) {
      if (tasks.length - prevTaskLength === -1) {
        listHeadingRef.current.focus();
      }
    }
  }, [tasks.length, prevTaskLength]);

  function addTask(name: string) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id: number) {
    const updatedTasks = tasks.map((task: Task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id: number, newName: string) {
    const editedTaskList = tasks.map((task: Task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id: number) {
    const remainingTasks = tasks.filter((task: Task) => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );

}
export default App;
