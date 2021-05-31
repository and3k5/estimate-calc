const { notations } = require("../notations");

module.exports.totalMsToObj = function (setup, ms) {
    const sortedNotations = setup.notations.concat().sort((a, b) => b.ms - a.ms);
    var obj = {};
    for (var notation of sortedNotations) {
        let value = Math.floor(ms / notation.ms);
        obj[notation.propertyName] = value;
        if (value > 0) {
            ms -= value * notation.ms;
        }

    }
    return obj;
}

module.exports.objToTotalMs = function (setup, obj) {
    let ms = 0;
    for (var notation of setup.notations) {
        if (!obj.hasOwnProperty(notation.propertyName))
            continue;
        ms += obj[notation.propertyName] * notation.ms;
    }
    return ms;
}