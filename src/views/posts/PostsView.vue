<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getPosts, type Post } from '@/api/posts'
import { AuthStore } from '@/stores/auth'

const posts = ref<Post[]>([])
const authStore = AuthStore()

const loadPosts = async () => {
  try {
    posts.value = await getPosts()
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

onBeforeMount(async () => {
  await loadPosts()
})
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Posts</h1>

    <div class="flex justify-center mb-8">
      <router-link
        v-if="authStore.token"
        to="/posts/create"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        Create Post
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="post in posts"
        :key="post.id?.toString()"
        class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-500 transition-transform transform hover:scale-105"
      >
        <h2 class="text-2xl font-semibold text-gray-700 mb-3">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.description }}</p>
        <router-link
          :to="`/posts/${post.id}`"
          class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Read More
        </router-link>
      </div>
    </div>
  </div>
</template>
