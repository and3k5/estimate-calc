const { calc } = require("./dist/calc.js");
const { TimeSetup, parseInput, getNotationByName } = calc;
var dayAmount = "10000h";
var dayParserSetup = new TimeSetup();
const timeSetup = new TimeSetup({
    notationsEditor: function (notations) {
        var notation = getNotationByName(notations, "d");
        var dayValue = parseInput(dayParserSetup, dayAmount);
        notation.ms = dayValue.totalMs;
        notation.relativeAmount = dayValue.totalMs / notations[notations.indexOf(notation) - 1].ms;
    }
});
var output = calc.parseInput(timeSetup, "0s");
output.sub(parseInput(timeSetup, "1s"))
console.log(output.values.map(x => x.notationName+": "+x.value));
console.log("result: " + output);
