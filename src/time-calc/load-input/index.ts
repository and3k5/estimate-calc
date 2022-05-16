import { Time } from "../../time";
import { TimeSetup } from "../../time/setup";
import { Action, addAction, subAction } from "../actions";

export type StringPartItem = string | Action | StringPartsArray;
export type StringPartsArray = StringPartItem[];

export function loadStringParts(str : string) {
    const result : StringPartsArray = [];

    const inputArray = Array.from(str);

    let i = 0;

    const a = result;

    const next = function () {
        inputArray.splice(0,1);
        i++;
    };
    const get = function () {
        return inputArray[0];
    }
    const yieldValue = function (v : StringPartItem) {
        a.push(v);
    };
    const hasStringGoing = function () {
        return a.length !== 0 && typeof (a[a.length - 1]) === "string";
    }
    const appendLastString = function (v : string) {
        if (!hasStringGoing())
            a.push("");
        a[a.length - 1] += v;
    };

    while (inputArray.length > 0) {
        let b = get();

        if (b == "+") {
            if (i > 0)
                yieldValue(addAction);
        }
        else if (b == "-") {
            if (i === 0)
                yieldValue("0m");
            yieldValue(subAction)
        }
        else if (b == "(") {
            let level = 0;
            let subScope = "";

            do {
                if (b === "(")
                {
                    level++;
                }
                next();
                b = get();
                if (b === ")") {
                    level--;
                    if (level === 0)
                        break;
                }
                subScope += b;
            }
            while (b !== ")");

            yieldValue(loadStringParts(subScope));
        } else {
            if (b.trim() !== "" || hasStringGoing())
                appendLastString(b);
        }

        next();
    }

    return result;
}

export function parseStringParts(setup: TimeSetup, data : StringPartsArray) {
    const result : TimePartsArray = [];
    return data
        .reduce((a, b) => {
            if (typeof (b) === "string") {
                a.push(new Time(setup, b as string))
            } else if(Array.isArray(b)) {
                a.push(parseStringParts(setup, b));
            } else {
                a.push(b);
            }
            return a;
        }, result)
}

export type TimePartItem = Time | Action | TimePartsArray;
export type TimePartsArray = TimePartItem[];

export type InputValue = string | string[];

export function loadInput(setup: TimeSetup, inputValue: InputValue) {
    const str = Array.isArray(inputValue) ? inputValue.map(x => "("+x+")").join(" + ") : inputValue;
    const stringParts = loadStringParts(str);
    return parseStringParts(setup, stringParts);
}