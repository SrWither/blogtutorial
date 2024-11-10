<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { AuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')

const router = useRouter()
const authStore = AuthStore()

const handleLogin = () => {
  if (email.value === '' || password.value === '') {
    alert('Email and password are required')
    return
  }

  login(email.value, password.value)
    .then((token) => {
      if (!token) {
        console.error('Token is missing')
        return
      }
      console.log(token)
      authStore.setToken(token)
      router.push('/')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div
    class="h-[calc(100vh-4.5rem)] flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-50"
  >
    <div class="p-6 bg-white shadow-2xl rounded-2xl w-full max-w-sm">
      <h1 class="text-3xl font-extrabold text-center text-gray-700 mb-4">Login</h1>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-3 border border-gray-200 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 border border-gray-200 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        @click="handleLogin"
        class="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg mt-5 hover:bg-blue-600 transition-shadow shadow-md"
      >
        Login
      </button>
    </div>
  </div>
</template>
