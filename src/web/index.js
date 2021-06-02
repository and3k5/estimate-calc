import Vue from "vue";
import "./extensions";
import { calculator } from "./components";

var mainEl = document.getElementById("app");

new Vue(calculator.calc).$mount(mainEl);