import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import "./axios";

createApp(App)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
