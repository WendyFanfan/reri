import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", name: "HomeDe", component: Home, meta: { lang: "de" } },
    { path: "/en", name: "HomeEn", component: Home, meta: { lang: "en" } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
