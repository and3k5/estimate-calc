import Vue from "vue";

Vue.directive("keep-focus", {
    bind: function () {
        console.log("bind(",Array.from(arguments),")");
    },
    componentUpdated: function () {
        console.log("componentUpdated(",Array.from(arguments),")");
    },
    inserted: function () {
        console.log("inserted(",Array.from(arguments),")");
    },
    unbind: function () {
        console.log("unbind(",Array.from(arguments),")");
    },
    update: function () {
        console.log("update(",Array.from(arguments),")");
    },
})