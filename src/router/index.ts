import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import CreatePostView from '@/views/posts/CreatePostView.vue'
import UpdatePostView from '@/views/posts/UpdatePostView.vue'
import PostView from '@/views/posts/PostView.vue'
import PostsView from '@/views/posts/PostsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: CreatePostView,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/posts/update/:id',
      name: 'update-post',
      component: UpdatePostView,
    },
  ],
})

export default router
