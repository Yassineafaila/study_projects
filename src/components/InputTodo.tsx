import React from "react";
import { IError } from "../Interfaces";

interface IProps {
    task: string;
    error:IError
    addTask:()=>void,
  setTask: React.Dispatch<React.SetStateAction<string>>
}
const InputTodo:React.FC<IProps> = ({task,setTask,error,addTask}) => {
  return (
    <div className="header bg-white py-2 px-2 my-1.5 rounded w-96 ">
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          name="task"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add New Task Here"
          className="w-full px-2 focus:outline-1 focus:outline-blue-500 rounded"
        />
        <button
          type="button"
          onClick={addTask}
          className="bg-blue-400 text-white  py-1.5 px-4 rounded hover:bg-blue-500"
        >
          Add
        </button>
      </div>
      {error.isError && (
        <p className="text-red-500 text-sm font-medium px-2 mt-2 italic">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputTodo;
