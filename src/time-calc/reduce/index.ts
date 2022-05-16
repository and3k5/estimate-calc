import { Time } from "../../time";
import { TimePartItem, TimePartsArray } from "../load-input";

function parseTimeOrScope(item : TimePartItem) {
    if (item instanceof Time)
        return item;
    if (Array.isArray(item))
        return reduce(item);
    throw new Error("Unsupported type");
}

function parseAction(item : TimePartItem) {
    if (item instanceof Time)
        throw new Error("Unsupported type");
    if (Array.isArray(item))
        throw new Error("Unsupported type");
    return item;
}

export function reduce(chunks : TimePartsArray) {
    while (chunks.length > 1) {
        // var a = chunks.shift();
        // var action = chunks.shift();
        // var b = chunks.shift();
        const [a,action,b] = chunks.splice(0,3);

        const aTime = parseTimeOrScope(a);
        const bTime = parseTimeOrScope(b);
        const actionItem = parseAction(action);

        chunks.splice(0, 0, actionItem.exec(aTime, bTime));
    }
    return chunks[0] as Time;
}