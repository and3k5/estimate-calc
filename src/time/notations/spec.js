import { getNotationByName } from ".";
import { TimeSetup } from "../setup";

describe("getNotationByName", function () {
    var setup = new TimeSetup();

    // it("returns milliseconds for ms", function () {
    //     const notation = getNotationByName("ms");
        
    //     expect(notation.singleName).toBe("millisecond");
    // });

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
