<template>
  <div class="register-container">
    <!-- 左侧品牌展示 -->
    <div class="register-left">
      <div class="brand">
        <h1 class="brand-title">RERI</h1>
        <p class="brand-desc">Create your account and explore our products</p>
      </div>
    </div>

    <!-- 右侧注册表单 -->
    <div class="register-right">
      <n-card class="register-card" title="Create an Account" size="large">
        <n-form :model="form" ref="formRef">
          <n-form-item label="Name" path="name">
            <n-input v-model:value="form.name" placeholder="Your Name" />
          </n-form-item>

          <n-form-item label="Email" path="email">
            <n-input v-model:value="form.email" placeholder="you@example.com" />
          </n-form-item>

          <n-form-item label="Password" path="password">
            <n-input type="password" v-model:value="form.password" placeholder="Password" />
          </n-form-item>

          <n-form-item label="Confirm Password" path="confirmPassword">
            <n-input type="password" v-model:value="form.confirmPassword" placeholder="Confirm Password" />
          </n-form-item>

          <n-form-item>
            <n-button type="primary" block :loading="loading" @click="onSubmit">Register</n-button>
          </n-form-item>
        </n-form>

        <div class="login-link">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { NForm, NFormItem, NInput, NButton, NCard } from "naive-ui"
// import { registerApi } from "@/services/auth"

const router = useRouter()
const loading = ref(false)
const formRef = ref()

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})

// const rules = {
//   name: [{ required: true, message: "Name is required", trigger: "blur" }],
//   email: [
//     { required: true, message: "Email is required", trigger: "blur" },
//     { type: "email", message: "Invalid email format", trigger: "blur" }
//   ],
//   password: [{ required: true, message: "Password is required", trigger: "blur" }],
//   confirmPassword: [
//     { required: true, message: "Please confirm password", trigger: "blur" },
//     {
//       validator: (rule: any, value: string) => value === form.password,
//       message: "Passwords do not match",
//       trigger: "blur"
//     }
//   ]
// }

async function onSubmit() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      loading.value = true
      try {
        // const res = await registerApi(form)
        console.log("Register data:", form)
        router.push("/login")
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
}

/* 左侧品牌 */
.register-left {
  flex: 1;
  background: linear-gradient(135deg, #6c63ff, #3f3d56);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.brand {
  text-align: center;
}
.brand-title {
  font-size: 2.5rem;
  font-weight: bold;
}
.brand-desc {
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* 右侧表单 */
.register-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.register-card {
  width: 100%;
  max-width: 400px;
}
.login-link {
  margin-top: 1rem;
  text-align: center;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    height: 100vh;
  }
  .register-left {
    flex: none;
    min-height: 200px;
  }
  .register-right {
    flex: 1;
    padding: 1.5rem;
  }
}
</style>
