import { TimeSetup } from "../time/setup";
import { default as parseInputImpl } from "./parse-input";
import reduce from "./reduce";

export function parseInput(setup : TimeSetup, input : string) {
    const chunks = parseInputImpl(setup, input);
    const result = reduce(chunks);
    return result;
}