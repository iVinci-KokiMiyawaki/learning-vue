<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="新しいタスクを追加">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'TodoList',
  setup() {
    const newTodo = ref('');
    const todos = reactive([]);
    let nextId = 1;

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.push({ id: nextId++, text: newTodo.value });
        newTodo.value = '';
      }
    };

    const removeTodo = (id) => {
      const index = todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
    };

    return { newTodo, todos, addTodo, removeTodo };
  }
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
