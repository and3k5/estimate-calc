import { Time } from "../../time";
import { TimePartItem, TimePartsArray } from "../load-input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function typeStr(value: any) {
    if (value === null)
        return "null";
    if (value === undefined)
        return "undefined";
    if (Array.isArray(value)) {
        let v = `array with ${value.length} item${value.length !== 1 ? "s" : ""}`;
        if (value.length > 0) {
            const types = value.map(x => typeStr(x)).join(",");
            v += ` of the type${types.length !== 1 ? "s" : ""} [${types}]`;
        }
        return v;
    }
    const type = typeof (value);
    switch (type) {
    case "bigint":
    case "boolean":
    case "function":
    case "number":
    case "string":
    case "symbol":
        return type;
    }

    return value.constructor.name;

}

function parseTimeOrScope(item: TimePartItem) {
    if (item instanceof Time)
        return item;
    if (Array.isArray(item))
        return reduce(item);
    throw new Error("Unsupported type: " + typeStr(item));
}

function parseAction(item: TimePartItem) {
    if (item instanceof Time)
        throw new Error("Unsupported type: " + typeStr(item));
    if (Array.isArray(item))
        throw new Error("Unsupported type: " + typeStr(item));
    return item;
}

export function reduce(chunks: TimePartsArray) {
    while (chunks.length > 1) {
        // var a = chunks.shift();
        // var action = chunks.shift();
        // var b = chunks.shift();
        const [a, action, b] = chunks.splice(0, 3);

        const aTime = parseTimeOrScope(a);
        const bTime = parseTimeOrScope(b);
        const actionItem = parseAction(action);

        chunks.splice(0, 0, actionItem.exec(aTime, bTime));
    }
    return chunks[0] as Time;
}