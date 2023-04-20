<script setup lang="ts">
import { MDCRipple } from '@material/ripple';
import { onMounted, ref } from 'vue';

const btn = ref<HTMLButtonElement>()

const props = defineProps({
    outlined: Boolean,
    raised: Boolean,
});

defineEmits(["click"]);

let mdcRipple = null as MDCRipple | null;

onMounted(() => {
    if (btn.value == null)
        throw new Error("missing ref");
    mdcRipple = new MDCRipple(btn.value);
});
</script>

<template>
    <div class="mdc-touch-target-wrapper">
        <button
            ref="btn"
            :class="{ 'mdc-button mdc-button--touch': true, 'mdc-button--outlined': outlined, 'mdc-button--raised': raised }"
            @click="$emit('click', $event)"
        >
            <span class="mdc-button__ripple" />
            <span class="mdc-button__touch" />
            <span class="mdc-button__label">
                <slot />
            </span>
        </button>
    </div>
</template>

<style scoped lang="scss">@use "@material/button/styles";</style>