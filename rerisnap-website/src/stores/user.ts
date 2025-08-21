// src/stores/user.ts
import { defineStore } from 'pinia'

export interface UserInfo {
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  // 可根据需要扩展
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    user: null as UserInfo | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userEmail: (state) => state.user?.email ?? '',
  },
  actions: {
    setAuth(token: string, user: UserInfo | null) {
      this.token = token
      this.user = user
    },
    clearAuth() {
      this.token = ''
      this.user = null
    }
  },
  persist: {
    key: 'reri-user',
    // 使用 localStorage（开发阶段）；上线后若改为 HttpOnly cookie，可移除 persist 或只存非敏感 user info
    storage: localStorage,
  }
})
