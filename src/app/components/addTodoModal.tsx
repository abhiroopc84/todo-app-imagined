"use client";

import React, { useState } from "react";
import { useTodoStore } from "@/state/todoStore";
import { useDateStore } from "@/state/dateStore";
import { PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const AddTodoModal = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);
  const { selectedDate } = useDateStore();

  const handleSubmit = () => {
    if (text) {
      addTodo({
        text,
        description,
        completed: false,
        date: format(selectedDate, "yyyy-MM-dd"),
      });
      setText("");
      setDescription("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-0 left-0 flex flex-row items-center justify-center">
        <button
          className="rounded-full p-4 bg-white shadow-2xl shadow-gray-950"
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg shadow-2xl shadow-gray-500 flex flex-col gap-4 w-full max-w-96">
            <h2 className="text-lg font-bold">Add Todo</h2>
            <input
              type="text"
              placeholder="Task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoModal;
