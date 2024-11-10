import { defineStore } from 'pinia'

export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

type Auth = {
  token: string | null
}

export const AuthStore = defineStore('auth', {
  state: (): Auth => ({
    token: getItemFromLocalStorage<string>('auth'),
  }),
  actions: {
    setToken(token: string): void {
      this.token = token
      localStorage.setItem('auth', JSON.stringify(token))
    },
    clearToken(): void {
      this.token = null
      localStorage.removeItem('auth')
    },
  },
})
