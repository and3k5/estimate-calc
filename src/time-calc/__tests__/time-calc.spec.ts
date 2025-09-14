import { TimeSetup } from "../../time/setup";
import { parseInput } from "..";
import { describe, it, expect } from "vitest";

describe("parseInput", function () {
    it("merges notations correcly", function () {
        const result = parseInput(new TimeSetup(), "20m + 30m");

        expect(result.getNotationValue("minutes")).toBe(50);
    });

    it("can add with same notation", function () {
        const result = parseInput(new TimeSetup(), "20m + 30m");

        expect(result.toString()).toBe("50m");
    });

    it("can add with two different notations", function () {
        const result = parseInput(new TimeSetup(), "20m + 1h");

        expect(result.toString()).toBe("1h 20m");
    });

    it("can subtract with same notation", function () {
        const result = parseInput(new TimeSetup(), "20m - 10m");

        expect(result.toString()).toBe("10m");
    });

    it("can subtract with two different notations", function () {
        const result = parseInput(new TimeSetup(), "1h - 20m");
        expect(result.toString()).toBe("40m");
    });

    it("can return negative value", function () {
        const result = parseInput(new TimeSetup(), "20m - 30m");

        expect(result.toString()).toBe("-10m");
    });

    it("can add from array input", function () {
        const result = parseInput(new TimeSetup(), ["1h 20m", "20m"]);

        expect(result.toString()).toBe("1h 40m");
    });
});
