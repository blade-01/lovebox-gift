import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HomeUnboxed from "../views/HomeUnboxed.vue";
import HomeGift from "../views/HomeGift.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => HomeView,
  },
  {
    path: "/home-unboxed",
    name: "home-unboxed",
    component: () => HomeUnboxed,
  },
  {
    path: "/home-gift",
    name: "home-gift",
    component: () => HomeGift,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    return { path: "/" };
  }
});

export default router;
