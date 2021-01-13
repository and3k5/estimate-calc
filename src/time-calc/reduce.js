module.exports = function (chunks) {
    while (chunks.length > 1) {
        // var a = chunks.shift();
        // var action = chunks.shift();
        // var b = chunks.shift();
        const [a, action, b] = chunks.splice(0, 3)
        chunks.splice(0, 0, action.exec(a, b));
    }
    return chunks[0];
}