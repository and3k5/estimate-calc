const regex = (/(?<amount>[0-9]+)(?<notation>[a-z])/gi);
const { notations, getNotationByName } = require("./notations");
const { totalMsToObj, objToTotalMs } = require("./time-obj");

function Time(...args) {
    var totalMs = 0;

    Object.defineProperty(this, "totalMs", {
        get: function () {
            return totalMs;
        },
        set: function (v) {
            totalMs = v;
        }
    });

    for (const notation of notations) {
        Object.defineProperty(this, notation.propertyName, {
            get: function () {
                return totalMsToObj(totalMs)[notation.propertyName];
            },
            set: function (newValue) {
                var oldValue = totalMsToObj(totalMs)[notation.propertyName];
                var diff = newValue - oldValue;
                if (diff === 0)
                    return;
                totalMs += notation.ms * diff;
            }
        });
    }

    if (typeof (args[0]) === "string") {
        for (const item of args[0].matchAll(regex)) {
            const notation = getNotationByName(item.groups.notation);
            if (notation == null)
                throw new Error("Did not found a notation for: " + item.groups.notation);
            totalMs += notation.ms * parseInt(item.groups.amount);
        }
    } else if (typeof (args[0]) === "object" && args[0] != null) {
        totalMs = objToTotalMs(args[0]);
    }

    this.add = function (time) {
        this.minutes += time.minutes;
        this.hours += time.hours;
        this.days += time.days;
        return this;
    };
    this.sub = function (time) {
        this.minutes -= time.minutes;
        this.hours -= time.hours;
        this.days -= time.days;
        return this;
    };
    this.clone = function () {
        return new Time(this)
    }
}
Time.prototype.toString = function () {
    const time = this;
    return notations.map(notation => ({ notation, value: time[notation.propertyName] }))
        .filter(item => item.value > 0)
        .sort((a, b) => a.notation.order - b.notation.order)
        .map(x => x.value + "" + x.notation.notation)
        .join(" ");
}

module.exports = Time;