const parseInput = require("./parse-input");
const reduce = require("./reduce");

module.exports = function (input) {
    const chunks = parseInput(input);
    const result = reduce(chunks);
    return result.toString();
}