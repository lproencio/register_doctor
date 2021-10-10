import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Main,
    children: [
      {
        name: "professional",
        path: "",
        component: () => import("../views/Professional.vue"),
      },
      {
        name: "attendance",
        path: "atendimento",
        component: () => import("../views/Attendance.vue"),
      },
      {
        name: "resume",
        path: "resumo",
        component: () => import("../views/Resume.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
