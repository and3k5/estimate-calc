import { Time } from "..";
import { TimeSetup } from "../setup";
import { describe, it, expect } from "vitest";

describe("Time type", function () {
    const setup = new TimeSetup({ defaultNotations: true });

    it("returns right amount of minutes", function () {
        const time = new Time(setup, "10m");

        expect(time.getNotationValue("minutes")).toBe(10);
        expect(time.getNotationValue("hours")).toBe(0);
        expect(time.getNotationValue("days")).toBe(0);
    });

    it("returns right amount of hours", function () {
        const time = new Time(setup, "10h");

        expect(time.getNotationValue("minutes")).toBe(0);
        expect(time.getNotationValue("hours")).toBe(10);
        expect(time.getNotationValue("days")).toBe(0);
    });

    it("returns right amount of days", function () {
        const time = new Time(setup, "10d");

        expect(time.getNotationValue("minutes")).toBe(0);
        expect(time.getNotationValue("hours")).toBe(0);
        expect(time.getNotationValue("days")).toBe(10);
    });

    it("can parse all notations", function () {
        const time = new Time(setup, "1m 2h 3d");

        expect(time.getNotationValue("minutes")).toBe(1);
        expect(time.getNotationValue("hours")).toBe(2);
        expect(time.getNotationValue("days")).toBe(3);
    });

    it(
        "increments notations correctly",
        function () {
            const time = new Time(setup, "0s");
            let totalAddedSeconds = 0;

            const totalSecondsToAdd = 60 * 60 * 24 + 60 * 60 * 1;

            for (let i = 0; i < totalSecondsToAdd; i++) {
                let secondsLeftInFormat = totalAddedSeconds;
                const expectedSeconds = secondsLeftInFormat % 60;
                secondsLeftInFormat -= expectedSeconds;
                expect(time.getNotationValue("seconds")).toBe(expectedSeconds);

                const expectedMinutes = (secondsLeftInFormat / 60) % 60;
                secondsLeftInFormat -= expectedMinutes * 60;
                expect(time.getNotationValue("minutes")).toBe(expectedMinutes);

                const expectedHours = (secondsLeftInFormat / 60 / 60) % 24;
                secondsLeftInFormat -= expectedHours * 60 * 60;
                expect(time.getNotationValue("hours")).toBe(expectedHours);

                const expectedDays = secondsLeftInFormat / 60 / 60 / 24;
                secondsLeftInFormat -= expectedHours * 60 * 60 * 24;
                expect(time.getNotationValue("days")).toBe(expectedDays);

                time.values.find((x) => x.notationName === "seconds")!.value++;
                totalAddedSeconds++;
            }
        },
        {
            timeout: 20000,
        },
    );

    it("decrements notations correctly", function () {
        const totalSecondsToAdd = 60 * 60 * 24 + 60 * 60 * 1;
        let currentSeconds = totalSecondsToAdd;
        const time = new Time(setup, totalSecondsToAdd * 1000);
        expect(time.totalMs).toBe(totalSecondsToAdd * 1000);

        for (let i = 0; i < totalSecondsToAdd; i++) {
            let secondsLeftInFormat = currentSeconds;
            const expectedSeconds = secondsLeftInFormat % 60;
            secondsLeftInFormat -= expectedSeconds;
            expect(time.getNotationValue("seconds")).toBe(expectedSeconds);

            const expectedMinutes = (secondsLeftInFormat / 60) % 60;
            secondsLeftInFormat -= expectedMinutes * 60;
            expect(time.getNotationValue("minutes")).toBe(expectedMinutes);

            const expectedHours = (secondsLeftInFormat / 60 / 60) % 24;
            secondsLeftInFormat -= expectedHours * 60 * 60;
            expect(time.getNotationValue("hours")).toBe(expectedHours);

            const expectedDays = secondsLeftInFormat / 60 / 60 / 24;
            secondsLeftInFormat -= expectedHours * 60 * 60 * 24;
            expect(time.getNotationValue("days")).toBe(expectedDays);

            time.values.find((x) => x.notationName === "seconds")!.value--;
            currentSeconds--;
        }
    });

    it("can add until value is positive", function () {
        const time = new Time(setup, "-5s");

        const originalSecondsValue = time.getNotationValue("seconds");
        expect(originalSecondsValue).toBe(-5);
        let totalAddedSeconds = 0;

        for (let i = 0; i < 10; i++) {
            expect(time.getNotationValue("seconds")).toBe(
                originalSecondsValue! + totalAddedSeconds,
            );
            expect(Math.abs(time.getNotationValue("hours")!)).toBe(0);
            expect(Math.abs(time.getNotationValue("minutes")!)).toBe(0);
            expect(Math.abs(time.getNotationValue("days")!)).toBe(0);

            time.values.find((x) => x.notationName === "seconds")!.value++;
            totalAddedSeconds++;
        }
    });

    it("can subtract until value is negative", function () {
        const time = new Time(setup, "5s");

        const originalSecondsValue = time.getNotationValue("seconds");
        expect(originalSecondsValue).toBe(5);
        let totalSubtractedSeconds = 0;

        for (let i = 0; i < 10; i++) {
            expect(originalSecondsValue).not.toBeUndefined();
            expect(time.getNotationValue("seconds")).toBe(
                originalSecondsValue! - totalSubtractedSeconds,
            );
            expect(Math.abs(time.getNotationValue("hours")!)).toBe(0);
            expect(Math.abs(time.getNotationValue("minutes")!)).toBe(0);
            expect(Math.abs(time.getNotationValue("days")!)).toBe(0);

            time.values.find((x) => x.notationName === "seconds")!.value--;
            totalSubtractedSeconds++;
        }
    });

    it("can parse single negative notation", function () {
        const time = new Time(setup, "-1m");

        expect(time.getNotationValue("minutes")).toBe(-1);
        expect(time.getNotationValue("hours")).toBe(-0);
        expect(time.getNotationValue("days")).toBe(-0);
    });

    describe("toString", function () {
        it("returns sorted string", function () {
            const time = new Time(setup, "1m 2h 3d");

            const string = time.toString();

            expect(string).toBe("3d 2h 1m");
        });

        it("returns correct string for a negative value", function () {
            const result = new Time(setup, "-10m");

            expect(result.toString()).toBe("-10m");
        });
    });

    describe("add", function () {
        it("returns total of same notations", function () {
            const a = new Time(setup, "1m");
            const b = new Time(setup, "1m");

            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(2);
        });

        it("returns total of different notations", function () {
            const a = new Time(setup, "1m");
            const b = new Time(setup, "1h");

            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(1);
            expect(a.getNotationValue("hours")).toBe(1);
        });

        it("returns total of multiple notations", function () {
            const a = new Time(setup, "1m");
            const b = new Time(setup, "1h 1m");

            a.add(b);

            expect(a.getNotationValue("minutes")).toBe(2);
            expect(a.getNotationValue("hours")).toBe(1);
        });
    });

    describe("sub", function () {
        it("returns total of same notations", function () {
            const a = new Time(setup, "2m");
            const b = new Time(setup, "1m");

            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(1);
        });

        it("returns total of different notations", function () {
            const a = new Time(setup, "1h");
            const b = new Time(setup, "1m");

            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(59);
            expect(a.getNotationValue("hours")).toBe(0);
        });

        it("returns total of multiple notations", function () {
            const a = new Time(setup, "1h 1m");
            const b = new Time(setup, "1m");

            a.sub(b);

            expect(a.getNotationValue("minutes")).toBe(0);
            expect(a.getNotationValue("hours")).toBe(1);
        });
    });
});
