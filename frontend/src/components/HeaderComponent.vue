<template>
  <header class="bg-gray-800 p-4 text-white">
    <nav class="container mx-auto flex justify-between">
      <h1 class="text-xl">My App</h1>
      <div>
        <router-link
          to="/"
          class="mr-4"
          >Home</router-link
        >
        <router-link
          v-if="!user"
          to="/login"
          >Login</router-link
        >
        <button
          v-else
          @click="handleSignOut"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

import { useAuth } from "../composables/useAuth"

const { user, checkUser, signOut } = useAuth()
const router = useRouter()

onMounted(checkUser)

const handleSignOut = async () => {
  await signOut()
  router.push("/login")
}
</script>
