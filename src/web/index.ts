import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const mainEl = document.getElementById("app");

if (mainEl == null) {
    throw new Error("Could not initialize application");
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount(mainEl);
