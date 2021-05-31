<template>
    <div :class="$style['time-component']">
        <div :class="$style['calc']">
            <div>
                <input
                    type="text"
                    v-model="text"
                    placeholder="2h 30m + 1h 45m"
                />
            </div>
            <div>
                Result: <span>{{ result }}</span>
            </div>
        </div>

        <div :class="$style['settings']">
            <label>1 day = <input type="text" v-model="dayAmount"></label>
        </div>
    </div>
</template>

<style module>
.time-component {
    display:flex;
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

<script>
import { parseInput } from "../../../time-calc";
import { getNotationByName } from '../../../time/notations';
import { TimeSetup } from '../../../time/setup';

export default {
    data() {
        return {
            text: "",
            dayAmount: "8h",
            dayParserSetup: new TimeSetup(),
            currentSetup: null,
            result: "",
        };
    },
    watch: {
        "dayAmount": {
            handler(newValue) {
                var dayParserSetup = this.dayParserSetup;
                this.currentSetup = new TimeSetup({notationsEditor(notations) {
                    var notation = getNotationByName(notations, "d");
                    var dayValue = parseInput(dayParserSetup, newValue);
                    console.log(dayValue);
                    notation.ms = dayValue.totalMs;
                    notation.relativeAmount = dayValue.totalMs / notations[notations.indexOf(notation)-1].ms;
                }})
            },
            immediate: true,
        },
        "text": {
            handler(newValue) {
                try {
                    this.result = parseInput(this.currentSetup, newValue);
                }
                catch (e) {
                    this.result = "";
                }
            },
            immediate: false,
        }
    },
};
</script>