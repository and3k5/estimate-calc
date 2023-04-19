import { createApp } from "vue";
import { calculator } from "./components";

const mainEl = document.getElementById("app");

if (mainEl == null) {
    throw new Error("Could not initialize application");
}

createApp(calculator.calcControl).mount(mainEl);