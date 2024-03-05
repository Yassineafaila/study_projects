import React from "react";
import { ITask } from "../Interfaces";
interface IProps {
  todo: ITask;
}
const Todo: React.FC<IProps> = ({ todo }) => {
  return (
    <input
      type="text"
      readOnly
      value={todo.name}
      className={`bg-transparent w-full focus:outline-none ${
        todo.isDone ? "line-through" : null
      }`}
    />
  );
};

export default Todo;
