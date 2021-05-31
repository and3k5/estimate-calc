const { TimeSetup } = require("../time/setup");
const parseInput = require("./parse-input");
const reduce = require("./reduce");

module.exports.parseInput = function (setup, input) {
    const chunks = parseInput(setup, input);
    const result = reduce(chunks);
    return result;
}