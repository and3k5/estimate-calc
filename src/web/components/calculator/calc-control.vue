<template>
    <div :class="$style['time-component']">
        <div :class="$style['calc']">
            <div>
                <input
                    v-model="text"
                    type="text"
                    placeholder="2h 30m + 1h 45m"
                >
            </div>
            <div>
                Result: <span>{{ formattedResult }}</span>
            </div>
        </div>

        <div :class="$style['settings']">
            <div>
                <label>1 day = <input
                    v-model="dayAmount"
                    type="text"
                ></label>
            </div>
            <div>
                <label>
                    Result format
                    <select
                        v-model="resultFormat"
                        type="text"
                    >
                        <option value="s:total">Total</option>
                        <template v-if="currentSetup != null">
                            <option
                                v-for="notation in currentSetup.notations"
                                :key="notation.notation"
                                :value="notation.notation"
                            >{{ notation.multiName }}</option>
                        </template>
                    </select>
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Time } from "../../../time";
import { parseInput } from "../../../time-calc";
import { getNotationByName } from '../../../time/notations';
import { TimeSetup } from '../../../time/setup';

export default defineComponent({
    data() {
        return {
            text: "",
            dayAmount: "8h",
            dayParserSetup: new TimeSetup(),
            currentSetup: null as TimeSetup | null,
            resultFormat: "s:total"
        };
    },
    computed: {
        result(): Time | null {
            if (this.currentSetup == null)
                return null;
            try {
                return parseInput(this.currentSetup, this.text);
            }
            catch (e) {
                return null;
            }
        },
        formattedResult(): string {
            if (this.resultFormat == "s:total") {
                if (this.result == null)
                    return "";
                return this.result.toString();
            } else {
                if (this.currentSetup == null)
                    return "";
                const notation = getNotationByName(this.currentSetup.notations, this.resultFormat);
                if (this.result == null) {
                    return "0 " + notation.notation;
                }
                return (this.result.totalMs / notation.ms) + " " + notation.notation;
            }
        }
    },
    watch: {
        "dayAmount": {
            handler(newValue) {
                const dayParserSetup = this.dayParserSetup;
                this.currentSetup = new TimeSetup({
                    notationsEditor(notations) {
                        const notation = getNotationByName(notations, "d");
                        const dayValue = parseInput(dayParserSetup, newValue);
                        console.log(dayValue);
                        notation.ms = dayValue.totalMs;
                        notation.relativeAmount = dayValue.totalMs / notations[notations.indexOf(notation) - 1].ms;
                    }
                })
            },
            immediate: true,
        }
    }
});
</script>

<style module>
.time-component {
    display: flex;
    flex-direction: column;
}

.time-component .calc {
    display: inline-block;
    font-size: 2em;
}

.time-component .settings {
    display: inline-block;
    font-size: .75em;
}

.time-component input[type="text"] {
    border-radius: 5px;
    font-size: inherit;
}
</style>