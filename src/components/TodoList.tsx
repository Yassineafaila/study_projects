import React from "react";
import { ITask } from "../Interfaces";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Todo from "./Todo";
interface IProps {
  todos: ITask[];
  searchForUpdating: (id: number) => void;
  deleteTask: (id: number) => void;
  checkTask: (id: number) => void;
}
const TodoList: React.FC<IProps> = ({
  todos,
  searchForUpdating,
  deleteTask,
  checkTask,
}) => {
  return (
    <div>
      {todos.map((todo: ITask, index: number) => {
        return (
          <div key={index} className="bg-slate-200 px-2 py-1.5 rounded flex">
            <Todo todo={todo} />
            <div className="flex gap-4">
              <button type="button" onClick={() => searchForUpdating(todo.id)}>
                <FaRegEdit className="text-lg" />
              </button>
              <button type="button" onClick={() => deleteTask(todo.id)}>
                <MdDeleteOutline className="text-lg text-red-500" />
              </button>
              <button type="button" onClick={() => checkTask(todo.id)}>
                <FaCheck className="text-lg text-green-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TodoList;
