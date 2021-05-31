const { defaultNotations: defNotations } = require("./notations");

module.exports.TimeSetup = function ({ defaultNotations = true, notationsEditor = null} = {}) {
    this.notations = [];
    
    if (defaultNotations === true) {
        for (var defaultNotation of defNotations) {
            this.notations.push(Object.assign({},defaultNotation));
        }
    }
    if (typeof(notationsEditor) === "function") {
        notationsEditor(this.notations);
    }
}