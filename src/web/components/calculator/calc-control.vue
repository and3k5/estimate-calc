<template>
    <div class="time-component">
        <input
            class="calc"
            type="text"
            v-model="text"
            label="Time"
            placeholder="2h 30m + 1h 45m"
            style="width: 100%"
        />
        <div>
            Result:
            <input
                class="result"
                type="text"
                :value="formattedResult"
                label="Result"
                style="width: 100%"
            />
        </div>
        <div class="settings">
            <label>
                Result format:&nbsp;
                <select class="format-selector" v-model="resultFormat">
                    <template v-for="{ text, value } in resultFormatOptions" :key="value">
                        <option :value="value">{{ text }}</option>
                    </template>
                </select> </label
            ><br />
            <label>
                1 day =
                <input class="day-field" type="text" v-model="dayAmount" outlined />
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Time } from "../../../time";
import { parseInput } from "../../../time-calc";
import { getNotationByName } from "../../../time/notations";
import { TimeSetup } from "../../../time/setup";

export default defineComponent({
    data() {
        return {
            text: "",
            dayAmount: "8h",
            dayParserSetup: new TimeSetup(),
            currentSetup: null as TimeSetup | null,
            resultFormat: "s:total",
        };
    },
    computed: {
        resultFormatOptions(): { text: string; value: string }[] {
            return [
                {
                    text: "Total",
                    value: "s:total",
                },
            ].concat(
                this.currentSetup?.notations.map((n) => ({
                    text: n.multiName,
                    value: n.notation,
                })) ?? [],
            );
        },
        result(): Time | null {
            if (this.currentSetup == null) return null;
            try {
                return parseInput(this.currentSetup, this.text);
            } catch {
                return null;
            }
        },
        formattedResult(): string {
            if (this.resultFormat == "s:total") {
                if (this.result == null) return "";
                return this.result.toString();
            } else {
                if (this.currentSetup == null) return "";
                const notation = getNotationByName(this.currentSetup.notations, this.resultFormat);
                if (this.result == null) {
                    return "0 " + notation.notation;
                }
                return this.result.totalMs / notation.ms + " " + notation.notation;
            }
        },
    },
    watch: {
        dayAmount: {
            handler(newValue) {
                const dayParserSetup = this.dayParserSetup;
                this.currentSetup = new TimeSetup({
                    notationsEditor(notations) {
                        const notation = getNotationByName(notations, "d");
                        const dayValue = parseInput(dayParserSetup, newValue);
                        console.log(dayValue);
                        notation.ms = dayValue.totalMs;
                        notation.relativeAmount =
                            dayValue.totalMs / notations[notations.indexOf(notation) - 1].ms;
                    },
                });
            },
            immediate: true,
        },
    },
});
</script>

<style lang="scss">
/*@use "@material/web/layout-grid/mdc-layout-grid";*/
</style>

<style scoped>
.time-component input {
    border-radius: 5px;
}

.time-component {
    display: flex;
    flex-direction: column;
}

.time-component .calc {
    display: inline-block;
    font-size: 2em;
    margin-bottom: 0.5em;
}

.time-component .result {
    display: inline-block;
    font-size: 2em;
    margin-bottom: 0.5em;
}

.time-component .settings {
    display: inline-block;
    font-size: 0.75em;
}
</style>
