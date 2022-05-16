export interface Notation {
    notation: string;
    singleName: string;
    multiName: string;
    propertyName: string;
    order: number;
    ms: number;
    relativeAmount: number;
    prev: Notation;
    next: Notation;
    visibleByDefault: boolean;
}
const defNotations = [
    // {
    //     notation: "ms",
    //     singleName: "millisecond",
    //     multiName: "milliseconds",
    //     propertyName: "milliseconds",
    //     order: 4,
    //     ms: 1,
    //     relativeAmount: 1,
    // },
    {
        notation: "s",
        singleName: "second",
        multiName: "seconds",
        propertyName: "seconds",
        order: 3,
        ms: 1000,
        relativeAmount: 1000,
        visibleByDefault: false,
    },
    {
        notation: "m",
        singleName: "minute",
        multiName: "minutes",
        propertyName: "minutes",
        order: 2,
        ms: 1000 * 60,
        relativeAmount: 60,
        visibleByDefault: true,
    },
    {
        notation: "h",
        singleName: "hour",
        multiName: "hours",
        propertyName: "hours",
        order: 1,
        ms: 1000 * 60 * 60,
        relativeAmount: 60,
        visibleByDefault: false,
    },
    {
        notation: "d",
        singleName: "day",
        multiName: "days",
        propertyName: "days",
        order: 0,
        ms: 1000 * 60 * 60 * 24,
        relativeAmount: 24,
        visibleByDefault: false,
    }
] as Notation[];

defNotations.forEach((val, i, arr) => val.prev = arr[i - 1]);
defNotations.forEach((val, i, arr) => val.next = arr[i + 1]);

export const defaultNotations = defNotations;

export function getDefaultNotationByName(notationName : string) {
    return getNotationByName(defNotations, notationName);
}

export function getNotationByName(notations : Notation[], notationName : string) {
    if (!Array.isArray(notations))
        throw new Error("First argument must be an array");
    const notation = notations.filter(n => n.notation == notationName)[0];
    return notation;
}