import { defaultNotations as defNotations, Notation } from "./notations";

export class TimeSetup {
    notations: Notation[] = [];
    constructor({ defaultNotations = true, notationsEditor = null }: { defaultNotations: boolean, notationsEditor: ((notations: Notation[]) => void) | null } = { defaultNotations: true, notationsEditor: null }) {
        console.trace("DEFAULT",defaultNotations);
        if (defaultNotations === true) {
            for (var defaultNotation of defNotations) {
                this.notations.push(Object.assign({}, defaultNotation));
            }
        }
        if (typeof (notationsEditor) === "function") {
            notationsEditor(this.notations);
        }
    }
}