"use client";

import React, { useState } from "react";
import { Todo, useTodoStore } from "@/state/todoStore";
import TodoItem from "@/app/components/todoItem";
import AddTodoModal from "@/app/components/addTodoModal";
import Header from "@/app/components/header";
import { useDateStore } from "@/state/dateStore";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import EditTodoModal from "@/app/components/editTodoModal";

export default function Home() {
  const { todos } = useTodoStore();
  const { selectedDate } = useDateStore();

  const selectedDay = format(selectedDate, "yyyy-MM-dd");
  const filteredTodos = todos.filter((todo) => todo.date === selectedDay);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTodo(null);
    setIsEditModalOpen(false);
  };

  const getDateLabel = () => {
    if (isToday(selectedDate)) {
      return "Today";
    }
    if (isTomorrow(selectedDate)) {
      return "Tomorrow";
    }
    if (isYesterday(selectedDate)) {
      return "Yesterday";
    }
    return format(selectedDate, "MMMM d");
  };

  return (
    <main className="h-dvh w-dvw font-sans flex flex-col justify-between">
      <Header />
      <section
        className="pt-[166px] px-4 pb-24 overflow-y-scroll"
        style={{
          mask: "linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 85%, rgba(0,0,0, 0) 90%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x",
        }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold pt-2">{getDateLabel()}</h1>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEditClick={openEditModal} />
          ))}
        </div>
      </section>
      <AddTodoModal />
      {isEditModalOpen && selectedTodo && (
        <EditTodoModal
          todoId={selectedTodo.id}
          initialText={selectedTodo.text}
          initialDescription={selectedTodo.description}
          closeModal={closeEditModal}
        />
      )}
    </main>
  );
}
