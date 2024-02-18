<template>
  <header class="bg-gray-800 p-4 text-white">
    <nav class="container mx-auto flex justify-between">
      <h1 class="text-xl">{{ currentRouteTitle }}</h1>
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
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import { useAuth } from "../composables/useAuth"

const { user, checkUser, signOut } = useAuth()
const router = useRouter()
const route = useRoute()
const currentRouteTitle = computed(() => route.meta.title || "My App")

onMounted(checkUser)

const handleSignOut = async () => {
  await signOut()
  router.push("/login")
}
</script>
