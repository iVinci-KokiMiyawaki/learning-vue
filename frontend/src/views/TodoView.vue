<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-xs">
      <h1 class="mb-4 text-center text-2xl font-bold">ToDo List</h1>
      <TodoList></TodoList>
    </div>
  </div>
</template>
<script setup>
import TodoList from "../components/TodoList.vue"
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
