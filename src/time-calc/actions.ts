import { Time } from "../time";

interface ActionExecution {
    (a: Time, b: Time): Time;
}

export interface Action {
    name: string;
    exec: ActionExecution;
}

export const addAction = {
    name: "add",
    exec: function (a, b) {
        return a.clone().add(b);
    },
} as Action;
export const subAction = {
    name: "sub",
    exec: function (a, b) {
        return a.clone().sub(b);
    },
} as Action;
