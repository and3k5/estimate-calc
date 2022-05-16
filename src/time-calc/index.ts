import { Time } from "../time";
import { TimeSetup } from "../time/setup";
import { InputValue, loadInput } from "./load-input";
import { reduce } from "./reduce";

export function parseInput(setup : TimeSetup, input : InputValue) : Time {
    const chunks = loadInput(setup, input);
    const result = reduce(chunks);
    return result;
}