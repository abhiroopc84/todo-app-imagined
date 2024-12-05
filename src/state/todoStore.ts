interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  date: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, updated: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}
