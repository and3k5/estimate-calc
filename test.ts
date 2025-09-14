import { TimeSetup } from "./src/lib";
import { Time } from "./src/time";

const setup = new TimeSetup({ defaultNotations: true });
const time = new Time(setup, "0s");
const entry = time.values.find((n) => n.notationName == "seconds");
if (entry == null) throw new Error("entry is not defined");
entry.value--;
console.log(time.toString());
