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
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
    },
  },
  persist: true,
})
