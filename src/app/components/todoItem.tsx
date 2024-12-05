import React from "react";
import { Todo, useTodoStore } from "@/state/todoStore";
import classNames from "classnames";
import {
  CheckIcon,
  CircleIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <>
      <div
        className={classNames(
          "p-4 rounded-xl flex flex-row items-center justify-between shadow-2xl shadow-gray-300",
          { "bg-gray-100": todo.completed, "bg-white": !todo.completed }
        )}
      >
        <div>
          <div className="flex flex-row w-full justify-between items-center">
            <button onClick={() => toggleTodo(todo.id)} className="pr-4 h-full">
              {todo.completed ? (
                <div className="bg-black h-6 w-6 rounded-full flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-white " />
                </div>
              ) : (
                <CircleIcon className="h-6 w-6" />
              )}
            </button>
            <div className="w-full">
              <p
                className={classNames(
                  "font-bold text-xl font-serif break-all",
                  {
                    "line-through text-gray-500": todo.completed,
                  }
                )}
              >
                {todo.text}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 pl-[40px] font-serif break-all">
            {todo.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
