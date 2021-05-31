describe("TimeCalc", function () {
    const timeCalc = require("./");

    it("can add with same notation", function () {
        var result = timeCalc("20m + 30m");

        expect(result).toBe("50m");
    });

    it("can add with two different notations", function () {
        var result = timeCalc("20m + 1h");

        expect(result).toBe("1h 20m");
    });

    it("can subtract with same notation", function () {
        var result = timeCalc("20m - 10m");

        expect(result).toBe("10m");
    });

    it("can subtract with two different notations", function () {
        var result = timeCalc("1h - 20m");

        expect(result).toBe("40m");
    });
});