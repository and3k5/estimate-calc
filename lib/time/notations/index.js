const notations = [
    {
        notation: "m",
        singleName: "minute",
        multiName: "minutes",
        propertyName: "minutes",
        order: 2,
        ms: 1000 * 60,
        relativeAmount: 1000 * 60,
    },
    {
        notation: "h",
        singleName: "hour",
        multiName: "hours",
        propertyName: "hours",
        order: 1,
        ms: 1000 * 60 * 60,
        relativeAmount: 60,
    },
    {
        notation: "d",
        singleName: "day",
        multiName: "days",
        propertyName: "days",
        order: 0,
        ms: 1000 * 60 * 60 * 8,
        relativeAmount: 8,
    }
];
notations.forEach((val, i, arr) => val.prev = arr[i - 1]);
notations.forEach((val, i, arr) => val.next = arr[i + 1]);

module.exports.notations = notations;

module.exports.getNotationByName = function (notationName) {
    const notation = notations.filter(n => n.notation == notationName)[0];
    return notation;
}