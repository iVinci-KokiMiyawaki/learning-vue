<template>
  <div class="flex h-screen items-center justify-center bg-gray-200">
    <div class="w-full max-w-xs">
      <form
        class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        @submit.prevent="handleLogin"
      >
        <div class="mb-4">
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="email"
          >
            メールアドレス
          </label>
          <input
            id="email"
            v-model="email"
            class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="mb-6">
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="password"
          >
            パスワード
          </label>
          <input
            id="password"
            v-model="password"
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            ログイン
          </button>
          <button
            class="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            @click="handleSignup"
          >
            サインアップ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

import { supabase } from "../libs/supabase"

const email = ref("")
const password = ref("")
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  const { user, error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (loginError) {
    error.value = loginError.message
  } else {
    // ログイン成功時の処理
    console.log("Logged in:", user)
    router.push("/todos")
  }
}

const handleSignup = async () => {
  const {
    data: { user },
    error: signupError,
  } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  console.log(user)
  if (signupError) {
    error.value = signupError.message
  } else {
    const response = await fetch("/api/users/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supabaseId: user.id,
        email: user.email,
        name: user.email,
      }),
    })
    if (!response.ok) {
      error.value = "Failed to sync user"
    }
    // サインアップ成功時の処理
    console.log("Signed up:", user)
    router.push("/todos")
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
