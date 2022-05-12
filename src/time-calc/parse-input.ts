import { Time } from "../time";
import { TimeSetup } from "../time/setup";
import { addAction, subAction } from "./actions";

export default function (setup: TimeSetup, str: string) {
    return Array.from(str).reduce((a: any[], b, i) => {
        if (b == "+") {
            if (i > 0)
                a.push(addAction);
        }
        else if (b == "-") {
            if (i === 0)
                a.push("0m");
            a.push(subAction)
        } else {
            if (i === 0 || a.length === 0 || typeof (a[a.length - 1]) !== "string")
                a.push("");
            //console.info("adding",b,"to",a[a.length - 1]);
            a[a.length - 1] += b;
        }
        return a;
    }, [])
        .reduce((a, b, i) => {
            if (typeof (b) === "string") {
                a.push(new Time(setup, b))
            } else {
                a.push(b);
            }
            return a;
        }, [])
}