import { loadStringParts } from ".";
import { addAction, subAction } from "../actions";

describe("loadStringParts", function () {
    it("loads parts correctly", function () {
        const result = loadStringParts("20m + 1h");

        expect(result.length).toBe(3);
        expect(result[0].trim()).toEqual("20m");
        expect(result[1]).toEqual(addAction);
        expect(result[2].trim()).toEqual("1h");
    });

    it("loads negative parts correctly", function () {
        const result = loadStringParts("-(1h 20m)");
        expect(result.length).toBe(3);
        expect(result[0].trim()).toBe("0m");
        expect(result[1]).toBe(subAction);
        expect(Array.isArray(result[2])).toBe(true);
        expect(result[2].length).toBe(1);
        expect(result[2][0]).toBe("1h 20m");
    });
});