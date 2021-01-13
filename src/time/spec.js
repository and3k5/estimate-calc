describe("Time type", function () {
    const Time = require("./");

    it("returns right amount of minutes", function () {
        var time = new Time("10m");

        expect(time.minutes).toBe(10);
        expect(time.hours).toBe(0);
        expect(time.days).toBe(0);
    });

    it("returns right amount of hours", function () {
        var time = new Time("10h");

        expect(time.minutes).toBe(0);
        expect(time.hours).toBe(2);
        expect(time.days).toBe(1);
    });

    it("returns right amount of days", function () {
        var time = new Time("10d");

        expect(time.minutes).toBe(0);
        expect(time.hours).toBe(0);
        expect(time.days).toBe(10);
    });

    it("can parse all notations", function () {
        var time = new Time("1m 2h 3d");

        expect(time.minutes).toBe(1);
        expect(time.hours).toBe(2);
        expect(time.days).toBe(3);
    });

    it("returns sorted string", function () {
        var time = new Time("1m 2h 3d");

        const string = time.toString();

        expect(string).toBe("3d 2h 1m");
    });
});