import { defineStore } from "pinia"

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    nextId: 1,
  }),
  actions: {
    addTodo(text) {
      if (text.trim()) {
        this.todos.push({
          title: text,
          description: "", // ここに適切な初期値を設定
          status: "pending", // または他の適切な初期ステータス
          // その他必要なフィールド
        })
      }
    },
    removeTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
    },
    setTodos(fetchedTodos) {
      this.todos = fetchedTodos
    },
  },
  persist: true,
})
