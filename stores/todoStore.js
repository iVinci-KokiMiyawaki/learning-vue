import { defineStore } from "pinia"

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    nextId: 1,
  }),
  actions: {
    addTodo(text) {
      if (text.trim()) {
        this.todos.push({ id: this.nextId++, text })
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
  },
})
