<template>
    <div>
        <input type="text" v-model="text" />=<span>{{ result }}</span>
    </div>
</template>

<script>
import timeCalc from "../../../../lib/time-calc";
export default {
    data() {
        return {
            text: "",
        };
    },
    computed: {
        result() {
            var result = "";
            try {
                result = timeCalc(this.text);
            } catch (e) {}

            return result;
        },
    },
};
</script>