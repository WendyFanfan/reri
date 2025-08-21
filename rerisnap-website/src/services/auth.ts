// src/services/auth.ts
import axios from 'axios'

type LoginResponse = {
  token: string
  user: any
}

const API_BASE = import.meta.env.VITE_API_BASE || '' // 例如 "http://localhost:4000/api"

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  // 如果你已有后端，取消下面的模拟逻辑，直接调用 axios.post(...)
  if (!API_BASE) {
    // 模拟：仅用于本地开发调试
    if (email === 'test@example.com' && password === '123456') {
      return {
        token: 'fake-jwt-token-12345',
        user: {
          id: 'u-1',
          name: 'Test User',
          email,
          phone: '',
          address: ''
        }
      }
    } else {
      throw new Error('Invalid email or password (mock)')
    }
  }

  const res = await axios.post<LoginResponse>(`${API_BASE}/auth/login`, { email, password })
  return res.data
}

export async function fetchProfile(token: string) {
  const res = await axios.get(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
