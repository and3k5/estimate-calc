module.exports.addAction = {
    name: "add",
    exec: function (a, b) {
        return a.clone().add(b);
    }
};
module.exports.subAction = {
    name: "sub",
    exec: function (a, b) {
        return a.clone().sub(b);
    }
};