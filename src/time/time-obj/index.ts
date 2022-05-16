import { TimeSetup } from "../setup";

type TimeNotationObject = { [notationName : string] : number };

export function totalMsToObj(setup : TimeSetup, ms : number) {
    const isNegative = ms < 0;
    if (isNegative)
        ms = ms * -1;
    const sortedNotations = setup.notations.concat().sort((a, b) => b.ms - a.ms);
    const obj : TimeNotationObject = {};
    for (const notation of sortedNotations) {
        const value = Math.floor(ms / notation.ms);
        obj[notation.propertyName] = isNegative ? value * -1 : value;
        if (value > 0) {
            ms -= value * notation.ms;
        }
    }
    return obj;
}

export function objToTotalMs(setup : TimeSetup, obj : TimeNotationObject) {
    let ms = 0;
    for (const notation of setup.notations) {
        if (!(notation.propertyName in obj))
            continue;
        ms += obj[notation.propertyName] * notation.ms;
    }
    return ms;
}