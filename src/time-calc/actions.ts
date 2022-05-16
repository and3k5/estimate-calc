import { Time } from "../time";

interface ActionExecution {
    (a: Time, b: Time): Time // eslint-disable-line no-unused-vars
}

export interface Action {
    name: string;
    exec: ActionExecution;
}

export const addAction = {
    name: "add",
    exec: function (a, b) {
        return a.clone().add(b);
    }
} as Action;
export const subAction = {
    name: "sub",
    exec: function (a, b) {
        return a.clone().sub(b);
    }
} as Action;