import { TimeSetup } from "../time/setup";

const parseInput = require("./parse-input");
const reduce = require("./reduce");

module.exports.parseInput = function (setup : TimeSetup, input : string) {
    const chunks = parseInput(setup, input);
    const result = reduce(chunks);
    return result;
}