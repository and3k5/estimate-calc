import { reduce } from "..";
import { Time } from "../../../time";
import { TimeSetup } from "../../../time/setup";
import { addAction } from "../../actions";
import { describe, it, expect } from "vitest";

describe("reduce", function () {
    const setup = new TimeSetup({ defaultNotations: true });

    it("merges notations correcly", function () {
        const result = reduce([
            new Time(setup, { minutes: 20 }),
            addAction,
            new Time(setup, { hours: 1 }),
        ]);

        const expected = new Time(setup, { hours: 1, minutes: 20 });

        expect(result.getNotationValue("minutes")).toEqual(expected.getNotationValue("minutes"));
        expect(result.getNotationValue("hours")).toEqual(expected.getNotationValue("hours"));

        expect(result.toString()).toBe(expected.toString());
    });
});
