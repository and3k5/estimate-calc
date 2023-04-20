<script setup lang="ts">
import { MDCFloatingLabel } from '@material/floating-label/component';
import { MDCTextField } from '@material/textfield';
import { defineProps, onMounted, ref, watch } from 'vue';

interface Props {
    label: string;
    modelValue: string;
    placeholder?: string;
}

const txtField = ref<HTMLElement>();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const mdcTextField = ref<MDCTextField>();

onMounted(() => {
    if (txtField.value == null) {
        throw new Error("missing ref");
    }
    mdcTextField.value = new MDCTextField(txtField.value);
});

function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
}

watch(() => props.modelValue, (newValue) => {
    ((mdcTextField.value as any)?.label as MDCFloatingLabel)?.float(newValue != "" && newValue != null)
});
</script>


<template>
    <label
        ref="txtField"
        class="mdc-text-field mdc-text-field--filled"
    >
        <span class="mdc-text-field__ripple" />
        <input
            class="mdc-text-field__input"
            type="text"
            :value="modelValue"
            :placeholder="placeholder"
            @input="onInput"
        >
        <span class="mdc-floating-label">{{ label }}</span>
        <span class="mdc-line-ripple" />
    </label>
</template>

<style scoped lang="scss">
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

@include textfield.core-styles;
</style>
