import { defaultNotations as defNotations, Notation } from "./notations";

type NotationEditorMethod = (notations: Notation[]) => void;

export class TimeSetup {
    notations: Notation[] = [];
    constructor(
        {
            defaultNotations = true,
            notationsEditor = null,
        }: { defaultNotations?: boolean; notationsEditor?: NotationEditorMethod | null } = {
            defaultNotations: true,
            notationsEditor: null,
        },
    ) {
        if (defaultNotations === true) {
            for (const defaultNotation of defNotations) {
                this.notations.push(Object.assign({}, defaultNotation));
            }
        }
        if (typeof notationsEditor === "function") {
            notationsEditor(this.notations);
        }
    }
}
