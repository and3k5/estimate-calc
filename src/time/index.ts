import { getNotationByName, type Notation } from "./notations";
import { TimeSetup } from "./setup";
import { objToTotalMs, totalMsToObj, type TimeNotationObject } from "./time-obj";

const regex = /(?<amount>-?[0-9]+)(?<notation>[a-z])/gi;

export class NotationValue {
    get notationName() {
        return this.notation.propertyName;
    }
    notation: Notation;
    private time: Time;

    get value() {
        return totalMsToObj(this.time.setup, this.time.totalMs)[this.notationName];
    }

    set value(newValue) {
        const oldValue = totalMsToObj(this.time.setup, this.time.totalMs)[this.notationName];

        const diff = newValue - oldValue;
        if (diff === 0) return;
        this.time.totalMs += this.notation.ms * diff;
    }

    constructor(time: Time, notation: Notation) {
        this.notation = notation;
        this.time = time;
    }
}

export type TimeInputValue = TimeNotationObject | Time | string | number;

export class Time {
    setup: TimeSetup;
    values: NotationValue[] = [];
    totalMs = 0;
    constructor(setup: TimeSetup, inputValue: TimeInputValue) {
        if (!(setup instanceof TimeSetup)) throw new Error("Setup parameter required");
        this.setup = setup;
        for (const notation of setup.notations) {
            this.values.push(new NotationValue(this, notation));
        }

        if (typeof inputValue === "string") {
            this.totalMs = Time.parseTotalMsFromString(setup, inputValue);
        } else if (typeof inputValue === "number") {
            this.totalMs = inputValue;
        } else if (typeof inputValue === "object" && inputValue instanceof Time) {
            this.totalMs = inputValue.totalMs;
        } else if (typeof inputValue === "object" && inputValue != null) {
            this.totalMs = objToTotalMs(setup, inputValue);
        }
    }

    static parseTotalMsFromString(setup: TimeSetup, inputValue: string) {
        let totalMs = 0;
        for (const item of inputValue.matchAll(regex)) {
            if (item.groups == null) throw new Error("missing groups");
            const notation = getNotationByName(setup.notations, item.groups.notation);
            if (notation == null)
                throw new Error("Did not find a notation for: " + item.groups.notation);
            totalMs += notation.ms * parseInt(item.groups.amount);
        }
        return totalMs;
    }

    getNotationValue(notationName: string) {
        const notationValue = this.values.find((n) => n.notationName == notationName);
        if (notationValue == null) return undefined;
        return notationValue.value;
    }

    add(time: Time) {
        for (const notationValue of time.values) {
            const value = this.values.find((n) => n.notationName == notationValue.notationName);
            if (value == null) {
                throw new Error("Time has different notation setup");
            }
            value.value += notationValue.value;
        }
        return this;
    }
    sub(time: Time) {
        for (const notationValue of time.values) {
            const value = this.values.find((n) => n.notationName == notationValue.notationName);
            if (value == null) {
                throw new Error("Time has different notation setup");
            }
            value.value -= notationValue.value;
        }
        return this;
    }
    clone() {
        return new Time(this.setup, this);
    }
    format() {
        const values = this.values.sort((a, b) => a.notation.order - b.notation.order);

        if (values.find((x) => x.value) == null) {
            return this.formatNotationValue(
                values.find((x) => x.notation.visibleByDefault === true) || values[0],
            );
        }

        return this.formatNotationValues(values.filter((item) => item.value !== 0));
    }
    formatNotationValues(notationValues: NotationValue[]) {
        return notationValues.map((x) => this.formatNotationValue(x)).join(" ");
    }
    formatNotationValue(notationValue: NotationValue) {
        return notationValue.value + "" + notationValue.notation.notation;
    }
}
Time.prototype.toString = function () {
    return this.format();
};
