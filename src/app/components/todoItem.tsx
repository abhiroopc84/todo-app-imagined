import React from "react";
import { Todo, useTodoStore } from "@/state/todoStore";
import classNames from "classnames";
import {
  CheckIcon,
  CircleIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoItemProps {
  todo: Todo;
  onEditClick: (todo: Todo) => void;
}

const TodoItem = ({ todo, onEditClick }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <>
      <div
        className={classNames(
          "p-4 rounded-xl flex flex-row items-center justify-between shadow-2xl shadow-gray-300",
          { "bg-gray-100": todo.completed, "bg-white": !todo.completed }
        )}
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <div className="flex flex-col w-full">
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
            <div className="w-full" {...listeners}>
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
          <p className="text-sm text-gray-700 pl-[40px] font-serif break-all" {...listeners}>
            {todo.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 pl-4">
          <button
            onClick={() => onEditClick(todo)}
            disabled={todo.completed}
            className="disabled:text-gray-500"
          >
            <Pencil1Icon className="h-5 w-5" />
          </button>
          <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
