<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { AuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { authenticate } from './api/auth'
import { db } from './api/connect'

const authStore = AuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.clearToken()
  db.invalidate()
  router.push('/')
}

onBeforeMount(async () => {
  if (authStore.token) {
    const isAuth = await authenticate(authStore.token)
    if (!isAuth) {
      authStore.clearToken()
    }
  }
})
</script>

<template>
  <header>
    <nav class="p-4 flex justify-between items-center bg-blue-500 text-white">
      <h1 class="text-2xl font-bold">Blog</h1>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/">
            <button class="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Home</button>
          </router-link>
        </li>
        <li>
          <router-link to="/posts">
            <button class="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Posts</button>
          </router-link>
        </li>

        <li v-if="!authStore.token">
          <router-link to="/login">
            <button class="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Login</button>
          </router-link>
        </li>
        <li v-else>
          <button
            @click="handleLogout"
            class="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
