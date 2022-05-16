import { TimeSetup } from "./src/lib";
import { Time } from "./src/time";

var setup = new TimeSetup({ defaultNotations: true });
var time = new Time(setup, "0s");
var entry = time.values.find(n => n.notationName == "seconds");
if (entry == null)
    throw new Error("entry is not defined");
entry.value--;
console.log(time.toString());