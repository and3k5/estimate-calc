import { Time } from "./";
import { TimeSetup } from "./setup";

describe("Time type", function () {
    
    const setup = new TimeSetup({ defaultNotations: true });

    it("returns right amount of minutes", function () {
        var time = new Time(setup, "10m");

        expect(time.getNotationValue("minutes")).toBe(10);
        expect(time.getNotationValue("hours")).toBe(0);
        expect(time.getNotationValue("days")).toBe(0);
    });

    it("returns right amount of hours", function () {
        var time = new Time(setup, "10h");

        expect(time.getNotationValue("minutes")).toBe(0);
        expect(time.getNotationValue("hours")).toBe(10);
        expect(time.getNotationValue("days")).toBe(0);
    });

    it("returns right amount of days", function () {
        var time = new Time(setup, "10d");

        expect(time.getNotationValue("minutes")).toBe(0);
        expect(time.getNotationValue("hours")).toBe(0);
        expect(time.getNotationValue("days")).toBe(10);
    });

    it("can parse all notations", function () {
        var time = new Time(setup, "1m 2h 3d");

        expect(time.getNotationValue("minutes")).toBe(1);
        expect(time.getNotationValue("hours")).toBe(2);
        expect(time.getNotationValue("days")).toBe(3);
    });

    it("increments notations correctly", function () {
        var time = new Time(setup, "0s");
        var totalAddedSeconds = 0;

        const totalSecondsToAdd = 60 * 60 * 24 + 60 * 60 * 1;

        for (var i = 0;i<totalSecondsToAdd;i++) {
            var secondsLeftInFormat = totalAddedSeconds;
            const expectedSeconds = secondsLeftInFormat % 60;
            secondsLeftInFormat -= expectedSeconds;
            expect(time.getNotationValue("seconds")).withContext("seconds when added "+totalAddedSeconds+" seconds").toBe(expectedSeconds);

            const expectedMinutes = (secondsLeftInFormat / 60) % 60;
            secondsLeftInFormat -= expectedMinutes * 60;
            expect(time.getNotationValue("minutes")).withContext("minutes when added "+totalAddedSeconds+" minutes").toBe(expectedMinutes);

            const expectedHours = (secondsLeftInFormat / 60 / 60) % 24;
            secondsLeftInFormat -= expectedHours * 60 * 60;
            expect(time.getNotationValue("hours")).withContext("minutes when added "+totalAddedSeconds+" hours").toBe(expectedHours);

            const expectedDays = (secondsLeftInFormat / 60 / 60 / 24);
            secondsLeftInFormat -= expectedHours * 60 * 60 * 24;
            expect(time.getNotationValue("days")).withContext("days when added "+totalAddedSeconds+" seconds").toBe(expectedDays);

            time.values.find(x => x.notationName === "seconds").value++;
            totalAddedSeconds++;
        }
    });

    it("decrements notations correctly", function () {
        const totalSecondsToAdd = 60 * 60 * 24 + 60 * 60 * 1;
        var currentSeconds = totalSecondsToAdd;
        var time = new Time(setup, totalSecondsToAdd * 1000);
        expect(time.totalMs).toBe(totalSecondsToAdd * 1000);

        for (var i = 0;i<totalSecondsToAdd;i++) {
            var secondsLeftInFormat = currentSeconds;
            const expectedSeconds = secondsLeftInFormat % 60;
            secondsLeftInFormat -= expectedSeconds;
            expect(time.getNotationValue("seconds")).withContext("seconds when subtracted "+currentSeconds+" seconds").toBe(expectedSeconds);

            const expectedMinutes = (secondsLeftInFormat / 60) % 60;
            secondsLeftInFormat -= expectedMinutes * 60;
            expect(time.getNotationValue("minutes")).withContext("minutes when subtracted "+currentSeconds+" minutes").toBe(expectedMinutes);

            const expectedHours = (secondsLeftInFormat / 60 / 60) % 24;
            secondsLeftInFormat -= expectedHours * 60 * 60;
            expect(time.getNotationValue("hours")).withContext("minutes when subtracted "+currentSeconds+" hours").toBe(expectedHours);

            const expectedDays = (secondsLeftInFormat / 60 / 60 / 24);
            secondsLeftInFormat -= expectedHours * 60 * 60 * 24;
            expect(time.getNotationValue("days")).withContext("days when subtracted "+currentSeconds+" seconds").toBe(expectedDays);

            time.values.find(x => x.notationName === "seconds").value--;
            currentSeconds--;
        }
    });

    it("can add until value is positive", function () {
        var time = new Time(setup, "-5s");

        var originalSecondsValue = time.getNotationValue("seconds");
        expect(originalSecondsValue).toBe(-5);
        var totalAddedSeconds = 0;

        for (var i = 0;i<10;i++) {
            expect(time.getNotationValue("seconds")).withContext("seconds when subtracted "+totalAddedSeconds+" seconds").toBe(originalSecondsValue + totalAddedSeconds);
            expect(time.getNotationValue("hours")).withContext("hours when subtracted "+totalAddedSeconds+" seconds").toBe(0);
            expect(time.getNotationValue("minutes")).withContext("minutes when subtracted "+totalAddedSeconds+" seconds").toBe(0);
            expect(time.getNotationValue("days")).withContext("days when subtracted "+totalAddedSeconds+" seconds").toBe(0);

            time.values.find(x => x.notationName === "seconds").value++;
            totalAddedSeconds++;
        }
    });

    it("can subtract until value is negative", function () {
        var time = new Time(setup, "5s");

        var originalSecondsValue = time.getNotationValue("seconds");
        expect(originalSecondsValue).toBe(5);
        var totalSubtractedSeconds = 0;

        for (var i = 0;i<10;i++) {
            expect(time.getNotationValue("seconds")).withContext("seconds when subtracted "+totalSubtractedSeconds+" seconds").toBe(originalSecondsValue - totalSubtractedSeconds);
            expect(time.getNotationValue("hours")).withContext("hours when subtracted "+totalSubtractedSeconds+" seconds").toBe(0);
            expect(time.getNotationValue("minutes")).withContext("minutes when subtracted "+totalSubtractedSeconds+" seconds").toBe(0);
            expect(time.getNotationValue("days")).withContext("days when subtracted "+totalSubtractedSeconds+" seconds").toBe(0);

            time.values.find(x => x.notationName === "seconds").value--;
            totalSubtractedSeconds++;
        }
    });
    
    it("can parse single negative notation", function () {
        var time = new Time(setup, "-1m");

        expect(time.getNotationValue("minutes")).withContext("minutes").toBe(-1);
        expect(time.getNotationValue("hours")).withContext("hours").toBe(0);
        expect(time.getNotationValue("days")).withContext("days").toBe(0);
    });

    describe("toString", function () {
        it("returns sorted string", function () {
            var time = new Time(setup, "1m 2h 3d");
    
            const string = time.toString();
    
            expect(string).toBe("3d 2h 1m");
        });

        it("returns correct string for a negative value", function () {
            var result = new Time(setup,"-10m");
    
            expect(result.toString()).toBe("-10m");
        });
    });

    describe("add", function () {
        it("returns total of same notations", function () {
            var a = new Time(setup, "1m");
            var b = new Time(setup, "1m");
            
            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(2);
        });

        it("returns total of different notations", function () {
            var a = new Time(setup, "1m");
            var b = new Time(setup, "1h");
            
            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(1);
            expect(a.getNotationValue("hours")).toBe(1);
        });

        
        it("returns total of multiple notations", function () {
            var a = new Time(setup, "1m");
            var b = new Time(setup, "1h 1m");
            
            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(2);
            expect(a.getNotationValue("hours")).toBe(1);
        });
    });

    describe("sub", function () {
        it("returns total of same notations", function () {
            var a = new Time(setup, "2m");
            var b = new Time(setup, "1m");
            
            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(1);
        });

        it("returns total of different notations", function () {
            var a = new Time(setup, "1h");
            var b = new Time(setup, "1m");
            
            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(59);
            expect(a.getNotationValue("hours")).toBe(0);
        });

        
        it("returns total of multiple notations", function () {
            var a = new Time(setup, "1h 1m");
            var b = new Time(setup, "1m");
            
            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(0);
            expect(a.getNotationValue("hours")).toBe(1);
        });
    });
});