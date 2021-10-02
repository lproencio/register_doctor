import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Main,
    children: [
      {
        name: "Professional",
        path: "",
        component: () => import("../views/Professional.vue"),
      },
      {
        name: "Attendance",
        path: "atendimento",
        component: () => import("../views/Attendance.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
