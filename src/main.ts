import { createApp } from "vue";
import { createHead } from "@vueuse/head";

import App from "./App.vue";
import router from "./router";

// Tailwind Styles
import "./style.css";

// MDI Fonts
import "@mdi/font/css/materialdesignicons.css";

const head = createHead();

const app = createApp(App);

app.use(router).use(head).mount("#app");
