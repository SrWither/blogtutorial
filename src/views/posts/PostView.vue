<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { RecordId } from 'surrealdb'
import { getPost, type Post } from '@/api/posts'
import { AuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = AuthStore()

const postIdString = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const postIdSplited = postIdString.split(':')
const postId = new RecordId(postIdSplited[0], postIdSplited[1])

const post = ref<Post | null>(null)

const loadPost = async () => {
  try {
    post.value = await getPost(postId)
  } catch (error) {
    console.error('Error fetching post:', error)
  }
}

onBeforeMount(async () => {
  await loadPost()
})
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto" v-if="post">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-6">{{ post.title }}</h1>
    <div class="flex justify-center items-center mb-4">
      <p
        :class="{
          'text-green-600 bg-green-100 px-4 py-1 rounded-full': post.published,
          'text-red-600 bg-red-100 px-4 py-1 rounded-full': !post.published,
        }"
        class="text-sm font-medium"
      >
        {{ post.published ? 'Published' : 'Not Published' }}
      </p>
    </div>
    <router-link
      v-if="authStore.token"
      :to="`/posts/update/${post.id}`"
      class="block w-full md:w-auto bg-blue-500 text-white text-center p-3 rounded-lg font-semibold hover:bg-blue-600 transition-all mb-6 shadow-lg mx-auto max-w-xs"
    >
      Edit Post
    </router-link>
    <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-500">
      <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
    </div>
  </div>
</template>
