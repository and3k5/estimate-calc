<script setup lang="ts">
import MdcButton from '../button/MdcButton.vue';
import MdcMenu from '../menu/MdcMenu.vue';

import { PropType, ref, computed } from 'vue';
const button = ref<HTMLButtonElement>();
const open = ref(false);

const props = defineProps({
    options: {
        type: Array as PropType<{ text: string; value: string }[]>,
        default: undefined,
    },
    modelValue: {
        type: String,
        default: undefined,
    },
    placeholder: {
        type: String,
        default: undefined,
    },
});

const emit = defineEmits(["update:modelValue"]);

const selectedOption = computed(() => {
    const value = props.modelValue;
    return props.options?.find((x) => x.value === value);
});
const selectedText = computed(() => {
    return selectedOption.value?.text;
});

function emitValue(ev : CustomEvent) {
    const index = ev.detail.index;
    const item = ev.detail.item;

    if (props.options != null && props.options.length > 0) {
        emit("update:modelValue",props.options[index].value);
    }
}
</script>
<template>
    <div class="mdc-menu-surface--anchor menu-container">
        <MdcButton
            ref="button"
            raised
            @click="open = true"
        >
            {{ selectedText ?? placeholder ?? "Select a value" }}
        </MdcButton>
        <MdcMenu
            :open="open"
            :anchor-element="button"
            fullwidth
            :options="options"
            @menu-close="open = false"
            @select="emitValue($event)"
        >
            <slot />
        </MdcMenu>
    </div>
</template>

<style lang="scss">
.menu-container {

    display: inline-block;
}
</style>