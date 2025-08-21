import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import sensorData from "../views/sensorData.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "HomeDe", component: Home, meta: { lang: "de" } },
  { path: "/en", name: "HomeEn", component: Home, meta: { lang: "en" } },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/sensor", name: "SensorData", component: sensorData },

];

const router = createRouter({
  history: createWebHistory(), // HTML5 History 模式ß
  routes,
});

export default router;
