import Vue from "vue";
import { calculator } from "./components";

var mainEl = document.getElementById("app");

new Vue(calculator.calc).$mount(mainEl);