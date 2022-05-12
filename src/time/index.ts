import { getNotationByName } from "./notations";
import { TimeSetup } from "./setup";
import { objToTotalMs, totalMsToObj } from "./time-obj";

const regex = (/(?<amount>[0-9]+)(?<notation>[a-z])/gi);

export class Time {
    setup : TimeSetup;
    minutes: number = 0;
    hours: number = 0;
    days: number = 0;
    constructor(setup: TimeSetup, ...args : any[]) {
        if (!(setup instanceof TimeSetup))
            throw new Error("Setup parameter required");
        this.setup = setup;
        var totalMs = 0;

        Object.defineProperty(this, "totalMs", {
            get: function () {
                return totalMs;
            },
            set: function (v) {
                totalMs = v;
            }
        });

        for (const notation of setup.notations) {
            Object.defineProperty(this, notation.propertyName, {
                get: function () {
                    return (totalMsToObj(setup, totalMs) as any)[notation.propertyName];
                },
                set: function (newValue) {
                    var oldValue = (totalMsToObj(setup, totalMs) as any)[notation.propertyName];
                    var diff = newValue - oldValue;
                    if (diff === 0)
                        return;
                    totalMs += notation.ms * diff;
                }
            });
        }

        if (typeof (args[0]) === "string") {
            for (const item of args[0].matchAll(regex)) {
                if (item.groups == null)
                    throw new Error("missing groups");
                const notation = getNotationByName(setup.notations, item.groups.notation);
                if (notation == null)
                    throw new Error("Did not find a notation for: " + item.groups.notation);
                totalMs += notation.ms * parseInt(item.groups.amount);
            }
        } else if (typeof (args[0]) === "object" && args[0] != null) {
            totalMs = objToTotalMs(setup, args[0]);
        }
    }

    add(time : any) {
        this.minutes += time.minutes;
        this.hours += time.hours;
        this.days += time.days;
        return this;
    };
    sub(time : any) {
        this.minutes -= time.minutes;
        this.hours -= time.hours;
        this.days -= time.days;
        return this;
    };
    clone() {
        return new Time(this.setup, this)
    }
}
Time.prototype.toString = function () {
    const time = this;
    return this.setup.notations.map(notation => ({ notation, value: (time as any)[notation.propertyName] }))
        .filter(item => item.value > 0)
        .sort((a, b) => a.notation.order - b.notation.order)
        .map(x => x.value + "" + x.notation.notation)
        .join(" ");
}


module.exports = Time;