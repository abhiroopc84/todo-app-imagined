"use client";

import React, { useState } from "react";
import { useTodoStore } from "@/state/todoStore";

interface EditTodoModalProps {
  todoId: string;
  initialText: string;
  initialDescription: string;
  closeModal: () => void;
}

const EditTodoModal = ({
  todoId,
  initialText,
  initialDescription,
  closeModal,
}: EditTodoModalProps) => {
  const { editTodo } = useTodoStore();
  const [newText, setNewText] = useState(initialText);
  const [newDescription, setNewDescription] = useState(initialDescription);

  const handleSaveEdit = () => {
    editTodo(todoId, {
      text: newText,
      description: newDescription,
      completed: false,
    });
    closeModal();
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-2xl shadow-gray-500 flex flex-col gap-4 w-full">
        <h2 className="text-lg font-bold">Edit To-Do</h2>
        <input
          type="text"
          placeholder="Task title"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <textarea
          placeholder="Task description (optional)"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEdit}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
