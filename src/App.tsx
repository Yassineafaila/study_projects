import React, { useState } from "react";
import { ITask, IError } from "./Interfaces";

import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<IError>({ isError: false, message: "" });
  const [todos, setTodos] = useState<ITask[]>([]);

  const [update, setUpdate] = useState<boolean>(false);
  const [newUpdateTask, setNewUpdatedTask] = useState<string>("");
  const [idForUpdatingTask, setIdForUpdatingTask] = useState<number | null>(
    null
  );
  //This function is for adding a new Task
  const addTask = (): void | null => {
    if (task === "") {
      setError({ isError: true, message: "The Task Cannot Be Empty !" });
      return null;
    }
    const newTodo: ITask = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      name: task,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
    setError({ isError: false, message: "" });
    console.log("The Task Added Successfully");
  };

  //update task :update task have tow parts
  //->search part
  const searchForUpdating = (id: number): void => {
    const taskForUpdating: ITask | undefined = todos.find(
      (todo: ITask) => todo.id === id
    );
    setUpdate(true);
    setNewUpdatedTask(taskForUpdating.name);
    setIdForUpdatingTask(id);
  };
  //->update part

  const updateTask = (): void => {
    const taskForUpdating: ITask | undefined = todos.find(
      (todo: ITask) => todo.id === idForUpdatingTask
    );
    if (taskForUpdating) {
      const newTodos: ITask[] = todos.map((todo: ITask) => {
        if (todo.id === taskForUpdating.id) {
          return { ...todo, name: newUpdateTask };
        }
        return todo;
      });
      setTodos(newTodos);
    }
    setIdForUpdatingTask(null);
    setNewUpdatedTask("");
    setUpdate(false);
  };

  //delete task
  const deleteTask = (id: number): void => {
    const newTodos: ITask[] = todos.filter((todo: ITask) => todo.id !== id);
    setTodos(newTodos);
    console.log("deleted successfully");
  };

  //check task
  const checkTask = (id: number): void => {
    const newTodos: ITask[] = todos.map((todo: ITask) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(newTodos);
    console.log("checked successfully");
  };
  return (
    <main className="bg-blue-200 h-screen w-screen flex flex-col items-center py-5">
      <InputTodo
        task={task}
        setTask={setTask}
        error={error}
        addTask={addTask}
      />
      <div className="body bg-white py-2 px-2 my-1.5 rounded w-96 flex flex-col gap-2">
        {update && (
          <div className="bg-slate-200 px-2 py-1.5 rounded flex">
            <input
              type="text"
              value={newUpdateTask}
              name="update-task"
              className="bg-transparent w-full outline-none"
              onChange={(e) => setNewUpdatedTask(e.target.value)}
            />
            <button
              type="button"
              onClick={updateTask}
              className="bg-blue-400 text-white  py-1.5 px-4 rounded hover:bg-blue-500"
            >
              Update
            </button>
          </div>
        )}
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            searchForUpdating={searchForUpdating}
            deleteTask={deleteTask}
            checkTask={checkTask}
          />
        ) : (
          <div className="text-center bg-slate-200 py-1.5">No Tasks :C</div>
        )}
      </div>
    </main>
  );
};

export default App;
