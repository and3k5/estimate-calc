export class Notation {
    notation: string;
    singleName: string;
    multiName: string;
    propertyName: string;
    order: number;
    ms: number;
    relativeAmount: number;
    prev: Notation | undefined;
    next: Notation | undefined;
    visibleByDefault: boolean;
    constructor(
        notation: string,
        singleName: string,
        multiName: string,
        propertyName: string,
        order: number,
        ms: number,
        relativeAmount: number,
        visibleByDefault: boolean,
    ) {
        this.notation = notation;
        this.singleName = singleName;
        this.multiName = multiName;
        this.propertyName = propertyName;
        this.order = order;
        this.ms = ms;
        this.relativeAmount = relativeAmount;
        this.visibleByDefault = visibleByDefault;
    }
}

const defNotations: Notation[] = [
    // new Notation("ms","millisecond","milliseconds","milliseconds",4,1,1,false),
    new Notation("s", "second", "seconds", "seconds", 3, 1000, 1000, false),
    new Notation("m", "minute", "minutes", "minutes", 2, 1000 * 60, 60, true),
    new Notation("h", "hour", "hours", "hours", 1, 1000 * 60 * 60, 60, false),
    new Notation("d", "day", "days", "days", 0, 1000 * 60 * 60 * 24, 24, false),
];

defNotations.forEach((val, i, arr) => (val.prev = arr[i - 1]));
defNotations.forEach((val, i, arr) => (val.next = arr[i + 1]));

export const defaultNotations = defNotations;

export function getDefaultNotationByName(notationName: string) {
    return getNotationByName(defNotations, notationName);
}

export function getNotationByName(notations: Notation[], notationName: string) {
    if (!Array.isArray(notations)) throw new Error("First argument must be an array");
    const notation = notations.filter((n) => n.notation == notationName)[0];
    return notation;
}
