import { Time } from "../time";
import { TimeSetup } from "../time/setup";
import { loadString } from "./load-string";
import { reduce } from "./reduce";

export function parseInput(setup : TimeSetup, input : string) : Time {
    const chunks = loadString(setup, input);
    const result = reduce(chunks);
    return result;
}