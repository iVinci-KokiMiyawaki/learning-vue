<template>
  <div class="container mx-auto p-4">
    <div class="mb-4">
      <input
        v-model="newTodo"
        class="w-full rounded border-2 border-gray-200 p-2"
        placeholder="新しいタスクを追加"
        @keyup.enter="addTodo"
      />
    </div>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="my-2 flex items-center justify-between"
      >
        <div class="mr-4 flex-grow rounded bg-gray-200 p-2">
          {{ todo.title }}
        </div>
        <button
          class="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
          @click="removeTodo(todo.id)"
        >
          削除
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

import { useTodoStore } from "../stores/todoStore"

export default {
  setup() {
    const newTodo = ref("")
    const store = useTodoStore()

    const addTodo = () => {
      store.addTodo(newTodo.value)
      newTodo.value = ""
    }

    const removeTodo = id => {
      store.removeTodo(id)
    }

    // データをフェッチする関数
    const fetchTodos = async () => {
      try {
        const response = await fetch("api/todos") // ここにAPIのURLを入力
        if (!response.ok) {
          throw new Error("データの取得に失敗しました")
        }
        const data = await response.json()
        store.setTodos(data) // フェッチしたデータをtodosに割り当
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    // コンポーネントがマウントされた時にデータをフェッチ
    onMounted(fetchTodos)

    return { newTodo, addTodo, removeTodo, todos: store.todos }
  },
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
