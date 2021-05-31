describe("getNotationByName", function () {
    const { getNotationByName } = require("./");

    // it("returns milliseconds for ms", function () {
    //     const notation = getNotationByName("ms");
        
    //     expect(notation.singleName).toBe("millisecond");
    // });

    it("returns seconds for s", function () {
        const notation = getNotationByName("s");
        
        expect(notation.singleName).toBe("second");
    });

    it("returns minutes for m", function () {
        const notation = getNotationByName("m");
        
        expect(notation.singleName).toBe("minute");
    });

    it("returns hours for h", function () {
        const notation = getNotationByName("h");
        
        expect(notation.singleName).toBe("hour");
    });

    it("returns day for d", function () {
        const notation = getNotationByName("d");
        
        expect(notation.singleName).toBe("day");
    });
});
