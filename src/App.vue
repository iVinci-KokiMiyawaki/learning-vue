<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue"

export default {
  name: "App",
  components: {
    TodoList,
  },
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
