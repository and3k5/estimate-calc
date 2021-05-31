const { TimeSetup } = require("../setup");

describe("totalMsToObj", function () {
    const { totalMsToObj } = require("./");
    const setup = new TimeSetup();

    it("returns right object for ms of 5 minutes", function () {
        var time = totalMsToObj(setup, 1000 * 60 * 5);

        expect(time.minutes).toBe(5);
        expect(time.hours).toBe(0);
        expect(time.days).toBe(0);
    });

    it("returns right object for ms of 5 minutes and 2 hours", function () {
        var time = totalMsToObj(setup, 1000 * 60 * 5 + 1000 * 60 * 60 * 2);

        expect(time.minutes).toBe(5);
        expect(time.hours).toBe(2);
        expect(time.days).toBe(0);
    });

    it("returns right object for ms of 5 minutes and 2 hours and 3 days", function () {
        var time = totalMsToObj(setup, 1000 * 60 * 5 + 1000 * 60 * 60 * 2 + 1000 * 60 * 60 * 8 * 3);

        expect(time.minutes).toBe(5);
        expect(time.hours).toBe(2);
        expect(time.days).toBe(3);
    });
});

describe("objToTotalMs", function () {
    const { objToTotalMs } = require("./");
    const setup = new TimeSetup();

    it("returns right amount of ms for object with 5 minutes", function () {
        var ms = objToTotalMs(setup, { minutes: 5 });

        expect(ms).toBe(1000 * 60 * 5);
    });

    it("returns right amount of ms for object with 5 minutes and 2 hours", function () {
        var ms = objToTotalMs(setup, { minutes: 5, hours: 2 });

        expect(ms).toBe(1000 * 60 * 5 + 1000 * 60 * 60 * 2);
    });

    it("returns right amount of ms for object with 5 minutes and 2 hours and 3 days", function () {
        var ms = objToTotalMs(setup, { minutes: 5, hours: 2, days: 3 });

        expect(ms).toBe(1000 * 60 * 5 + 1000 * 60 * 60 * 2 + 1000 * 60 * 60 * 8 * 3);
    });

    it("returns right amount of ms for object with 5 minutes and 2 hours and 3 days", function () {
        var ms = objToTotalMs(setup, { minutes: 5, hours: 2, days: 3 });

        expect(ms).toBe(1000 * 60 * 5 + 1000 * 60 * 60 * 2 + 1000 * 60 * 60 * 8 * 3);
    });

    it("returns right amount of ms for object with 65 minutes", function () {
        var ms = objToTotalMs(setup, { minutes: 65 });

        expect(ms).toBe(1000 * 60 * 65);
    });

    it("returns right amount of ms for object with 65 minutes and 1 hour", function () {
        var ms = objToTotalMs(setup, { minutes: 65, hours: 1 });

        expect(ms).toBe(1000 * 60 * 65 + 1000 * 60 * 60 * 1);
    });

    it("returns right amount of ms for object with 65 minutes and 1 hour and 5 days", function () {
        var ms = objToTotalMs(setup, { minutes: 65, hours: 1, days: 5 });

        expect(ms).toBe(1000 * 60 * 65 + 1000 * 60 * 60 * 1 + 1000 * 60 * 60 * 8 * 5);
    });
});