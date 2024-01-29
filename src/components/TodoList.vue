<template>
  <div>
    <input
      v-model="newTodo"
      placeholder="新しいタスクを追加"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
      >
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue"
import { useTodoStore } from "../../stores/todoStore.js"

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

    return { newTodo, addTodo, removeTodo, todos: store.todos }
  },
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
