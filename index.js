const timeCalc = require("./src/time-calc");
const { EOL } = require("os");
const { SSL_OP_TLS_ROLLBACK_BUG } = require("constants");
const input = process.argv.slice(2).join(" ");

if (input === "") {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const q = function (question) {
        return new Promise((res, rej) => {
            rl.question(question, (answer) => res(answer));
        });
    };

    (async function () {
        try {
            let answer;
            while (true) {
                answer = await q("");
                if (answer.toUpperCase() == "EXIT")
                    break;
                const output = timeCalc(answer);
                process.stdout.write(" = " + output + EOL);
            }
        }
        finally {
            rl.close();
        }
    })();

} else {
    const output = timeCalc(input)
    process.stdout.write(output + EOL);
}

