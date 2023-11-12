import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HomeUnboxed from "../views/HomeUnboxed.vue";
import HomeGift from "../views/HomeGift.vue";
import HomeLoveBoxDetails from "../views/HomeLoveBoxDetails.vue";
import HomeTrackShipment from "../views/HomeTrackShipment.vue";
import HomeRating from "../views/HomeRating.vue";
import HomeThankYou from "../views/HomeThankYou.vue";
import HomeNote from "../views/HomeNote.vue";
import HomePackage from "../views/HomePackage.vue";

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
  {
    path: "/home-lovebox-details",
    name: "home-lovebox-details",
    component: () => HomeLoveBoxDetails,
  },
  {
    path: "/home-track-shipment",
    name: "home-track-shipment",
    component: () => HomeTrackShipment,
  },
  {
    path: "/home-rating",
    name: "home-rating",
    component: () => HomeRating,
  },
  {
    path: "/home-thank-you",
    name: "home-thank-you",
    component: () => HomeThankYou,
  },
  {
    path: "/home-note",
    name: "home-note",
    component: () => HomeNote,
  },
  {
    path: "/home-package",
    name: "home-package",
    component: () => HomePackage,
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
