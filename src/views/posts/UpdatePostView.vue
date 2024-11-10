<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { updatePost, type Post, getPost } from '@/api/posts'
import { AuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RecordId } from 'surrealdb'

const post = reactive<Post>({
  title: '',
  description: '',
  content: '',
  published: false,
})

const postData = ref<Post | null>(null)

const router = useRouter()
const route = useRoute()
const authStore = AuthStore()

const postIdString = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const postIdSplited = postIdString.split(':')
const postId = new RecordId(postIdSplited[0], postIdSplited[1])

const loadPostDetails = async () => {
  if (!authStore.token) return
  try {
    postData.value = await getPost(postId)
    Object.assign(post, postData.value)
  } catch (error) {
    console.error('Error fetching sale details:', error)
  }
}

const handleUpdatePost = () => {
  if (!authStore.token) {
    return
  }

  updatePost(authStore.token, postId, post)
    .then((post) => {
      if (post) {
        router.push(`/posts/${post.id}`)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

onBeforeMount(async () => {
  await loadPostDetails()
})
</script>

<template>
  <div
    class="h-[calc(100vh-4.5rem)] flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-50"
  >
    <div class="p-6 bg-white shadow-2xl rounded-2xl w-full max-w-sm">
      <h1 class="text-3xl font-extrabold text-center text-gray-700 mb-4">Update Post</h1>
      <input
        v-model="post.title"
        type="text"
        placeholder="Title"
        class="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <textarea
        v-model="post.description"
        placeholder="Description"
        class="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <textarea
        v-model="post.content"
        placeholder="Content"
        class="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <label class="flex items-center space-x-2 mb-3">
        <input v-model="post.published" type="checkbox" class="form-checkbox" />
        <span class="text-gray-700">Published</span>
      </label>
      <button
        @click="handleUpdatePost"
        class="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg mt-5 hover:bg-blue-600 transition-shadow shadow-md"
      >
        Update Post
      </button>
    </div>
  </div>
</template>
