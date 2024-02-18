<template>
  <div class="mx-auto max-w-xl rounded-lg bg-white p-6 text-center shadow-md">
    <h2 class="mb-4 text-2xl font-semibold text-gray-800">ToDoリストへようこそ！</h2>
    <p class="mb-6 text-gray-600">このToDoリストアプリでは、日々のタスクを簡単に管理できます。</p>
    <p class="mb-6 text-gray-600">以下のような機能が利用できます：</p>
    <ul class="mb-6 list-inside list-disc text-left">
      <li>タスクの追加、編集、削除</li>
      <li>タスクの状態（完了、未完了）の管理</li>
      <li>個人のToDoリストの閲覧</li>
    </ul>
    <p class="mb-6 font-bold text-blue-600">さあ、今すぐタスクを追加して、あなたのToDoリストを管理しましょう！</p>
    <button
      class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      @click="navigate"
    >
      {{ user ? "ToDoリストへ" : "ログインする" }}
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

import { useAuth } from "../composables/useAuth"

const { user } = useAuth()
const router = useRouter()

const navigate = () => {
  router.push(user.value ? "/todos" : "/login")
}
</script>

<style>
/* ここに必要に応じたスタイルを追加 */
</style>
