import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    orders: [] as Array<{ id: number, product: string, quantity: number, price: number }>
  }),

  getters: {
    orderCount: (state) => state.orders.length,
    isLoggedIn: (state) => !!state.email && !!state.password
  },

  actions: {
    setUserInfo(userData: {
      name?: string
      email?: string
      password?: string
      phone?: string
      address?: string
    }) {
      this.name = userData.name ?? this.name
      this.email = userData.email ?? this.email
      this.password = userData.password ?? this.password
      this.phone = userData.phone ?? this.phone
      this.address = userData.address ?? this.address
    },

    addOrder(order: { id: number, product: string, quantity: number, price: number }) {
      this.orders.push(order)
    },

    clearOrders() {
      this.orders = []
    },

    logout() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.phone = ''
      this.address = ''
      this.orders = []
    }
  },

  // 持久化配置
  persist: {
    key: 'reri-user', // localStorage 存储的 key
    storage: localStorage, // 使用 localStorage 存储
  }
})
