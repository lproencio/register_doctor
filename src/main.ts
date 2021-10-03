import Maska from "maska";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.css";

createApp(App).use(store).use(Maska).use(router).mount("#app");
