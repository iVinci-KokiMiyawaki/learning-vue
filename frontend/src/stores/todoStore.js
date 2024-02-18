import { defineStore } from "pinia"

import { supabase } from "../libs/supabase"

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
  }),
  actions: {
    async fetchTodos() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const token = session.access_token
        const response = await fetch("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("データの取得に失敗しました")
        }
        this.todos = await response.json()
      } catch (error) {
        console.error("Fetch error:", error)
      }
    },
    async createTodo(text) {
      if (text.trim()) {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession()
          const token = session.access_token
          const response = await fetch("/api/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: text,
              description: "",
              userId: session.user.id,
            }),
          })
          if (!response.ok) {
            throw new Error("ToDoの作成に失敗しました")
          }
          const newTodo = await response.json()
          this.todos.push(newTodo)
        } catch (error) {
          console.error("Create error:", error)
        }
      }
    },
    async removeTodo(id) {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const token = session.access_token
        const response = await fetch(`/api/todos/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("ToDoの削除に失敗しました")
        }
        // todosをspliceで削除
        const index = this.todos.findIndex(todo => todo.id === id)
        this.todos.splice(index, 1)
      } catch (error) {
        console.error("Delete error:", error)
      }
    },
  },
  persist: true,
})
