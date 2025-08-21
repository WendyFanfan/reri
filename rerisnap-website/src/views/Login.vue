<template>
  <div class="login-container">
    <!-- 左侧品牌介绍 -->
    <div class="login-left">
      <div class="brand">
        <h1>RERI Snap</h1>
        <p>Your trusted buttonhole & sewing tool supplier</p>
      </div>
    </div>

    <!-- 右侧登录卡片 -->
    <div class="login-right">
      <n-card class="login-card" :bordered="false">
        <h2 class="login-title">Sign in to your account</h2>

        <n-form :model="form" class="login-form" size="large">
          <n-form-item label="Email" path="email">
            <n-input
              v-model:value="form.email"
              placeholder="Email address"
              type="text"
            />
          </n-form-item>
          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="form.password"
              placeholder="Password"
              type="password"
            />
          </n-form-item>
          <div class="login-actions">
            <n-button
              type="primary"
              block
              @click="onSubmit"
              :loading="loading"
            >
              Sign in
            </n-button>
          </div>
        </n-form>

        <p class="login-footer">
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </p>

        <div v-if="error" class="error">{{ error }}</div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../services/auth'
import { useUserStore } from '../stores/user'
import { NForm, NFormItem, NInput, NButton, NCard } from 'naive-ui'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  email: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const res = await loginApi(form.email, form.password)
    userStore.setAuth(res.token, res.user)
    router.push({ name: 'Home' })
  } catch (err: any) {
    error.value = err?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 左边部分 */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
}
.login-left .brand {
  text-align: center;
  max-width: 300px;
}
.login-left h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* 右边部分 */
.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.login-card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  background: white;
}
.login-title {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.login-actions {
  margin-top: 1rem;
}
.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}
.login-footer a {
  color: #4f46e5;
  text-decoration: none;
}
.login-footer a:hover {
  text-decoration: underline;
}
.error {
  color: #f55;
  margin-top: 12px;
  text-align: center;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  .login-left {
    flex: none;
    min-height: 200px;
    padding: 1.5rem;
  }
  .login-right {
    flex: none;
    padding: 1.5rem;
  }
}
</style>
