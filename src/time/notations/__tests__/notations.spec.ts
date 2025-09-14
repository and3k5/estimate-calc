import { getNotationByName } from "..";
import { TimeSetup } from "../../setup";
import { describe, it, expect } from "vitest";

describe("getNotationByName", function () {
    const setup = new TimeSetup();

    it("returns seconds for s", function () {
        const notation = getNotationByName(setup.notations, "s");

        expect(notation.singleName).toBe("second");
    });

    it("returns minutes for m", function () {
        const notation = getNotationByName(setup.notations, "m");

        expect(notation.singleName).toBe("minute");
    });

    it("returns hours for h", function () {
        const notation = getNotationByName(setup.notations, "h");

        expect(notation.singleName).toBe("hour");
    });

    it("returns day for d", function () {
        const notation = getNotationByName(setup.notations, "d");

        expect(notation.singleName).toBe("day");
    });
});
