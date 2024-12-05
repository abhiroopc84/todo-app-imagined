"use client";

import React, { useState } from "react";
import { useTodoStore } from "@/state/todoStore";

const AddTodoModal: React.FC = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = () => {
    if (text) {
      addTodo({
        text,
        description,
        completed: false,
        date: new Date().toISOString().split("T")[0],
      });
      setText("");
      setDescription("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold">Add Todo</h2>
            <input
              type="text"
              placeholder="Task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
