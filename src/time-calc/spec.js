import { TimeSetup } from "../time/setup";
import { parseInput } from "./";

describe("parseInput", function () {
    it("merges notations correcly", function () {
        var result = parseInput(new TimeSetup(), "20m + 30m");

        expect(result.getNotationValue("minutes")).toBe(50);
    });

    it("can add with same notation", function () {
        var result = parseInput(new TimeSetup(), "20m + 30m");

        expect(result.toString()).toBe("50m");
    });

    it("can add with two different notations", function () {
        var result = parseInput(new TimeSetup(),"20m + 1h");

        expect(result.toString()).toBe("1h 20m");
    });

    it("can subtract with same notation", function () {
        var result = parseInput(new TimeSetup(),"20m - 10m");

        expect(result.toString()).toBe("10m");
    });

    it("can subtract with two different notations", function () {
        var result = parseInput(new TimeSetup(),"1h - 20m");
        expect(result.toString()).toBe("40m");
    });

    it("can return negative value", function () {
        var result = parseInput(new TimeSetup(),"20m - 30m");

        expect(result.toString()).toBe("-10m");
    });

    it("can add from array input", function () {
        var result = parseInput(new TimeSetup(), ["1h 20m", "20m"]);

        expect(result.toString()).toBe("1h 40m");
    });
});