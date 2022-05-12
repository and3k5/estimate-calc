import { Time } from "../time";

export const addAction = {
    name: "add",
    exec: function (a : Time, b : Time) {
        return a.clone().add(b);
    }
};
export const subAction = {
    name: "sub",
    exec: function (a : Time, b : Time) {
        return a.clone().sub(b);
    }
};