<template>
    <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                <TextField
                    v-model="text"
                    label="Time"
                    placeholder="2h 30m + 1h 45m"
                    style="width:100%"
                />
            </div>
        </div>

        <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <TextField
                    :model-value="formattedResult"
                    label="Result"
                    style="width:100%"
                />
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                <MdcSelect
                    v-model="resultFormat"
                    label="Result format"
                    :options="resultFormatOptions"
                />
            </div>
        </div>

        <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                <TextField
                    v-model="dayAmount"
                    label="1 day ="
                    outlined
                />
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
import MdcSelect from "../controls/MdcSelect/MdcSelect.vue";
import TextField from "../controls/textfield/MdcTextField.vue";

export default defineComponent({
    components: { TextField, MdcSelect },
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
        resultFormatOptions() : {text: string, value: string}[] {
            return [{
                    text: "Total",
                    value: "s:total",
                }].concat(this.currentSetup?.notations.map(n => ({text: n.multiName, value: n.notation})) ?? []);
        },
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
            }
            else {
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
                });
            },
            immediate: true,
        }
    }
});
</script>

<style lang="scss">
@use "@material/layout-grid/mdc-layout-grid";
</style>

<!-- <style module>
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
</style> -->