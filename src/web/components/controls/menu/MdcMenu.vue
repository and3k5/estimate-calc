<script lang="ts" setup>
import { onMounted, PropType, ref, watch } from 'vue';
import { MDCMenu } from '@material/menu';
import MdcMenuItem from './MdcMenuItem.vue';

const props = defineProps({
    fullwidth: Boolean,
    open: Boolean,
    options: {
        type: Array as PropType<{
            text: string;
            value: string;
        }[]>,
        default: undefined,
    },
});
const el = ref<HTMLElement>();
let mdcMenu: MDCMenu | undefined;

const emits = defineEmits(["select", "menu-close", "menu-open"]);

onMounted(() => {
    if (el.value == null) {
        throw new Error("missing ref")
    }
    mdcMenu = new MDCMenu(el.value);
    mdcMenu.open = props.open;
    mdcMenu.listen("MDCMenu:selected", (ev: CustomEvent) => {
        console.log(ev);
        emits("select", ev);
    });
    mdcMenu.listen("MDCMenuSurface:opened", () => emits("menu-open"));
    mdcMenu.listen("MDCMenuSurface:closed", () => emits("menu-close"));

});
watch(() => props.open, (newValue) => {
    if (mdcMenu == null) {
        throw new Error("missing mdc menu");
    }
    mdcMenu.open = newValue;
});
</script>
<template>
    <div
        ref="el"
        :class="{ 'mdc-menu mdc-menu-surface': true, 'mdc-menu-surface--fullwidth': fullwidth }"
    >
        <ul
            class="mdc-list"
            role="menu"
            aria-hidden="true"
            aria-orientation="vertical"
            tabindex="-1"
        >
            <template v-if="options != null">
                <template
                    v-for="option in options"
                    :key="option.value"
                >
                    <MdcMenuItem>{{ option.text }}</MdcMenuItem>
                </template>
            </template>
            <slot />
        </ul>
    </div>
</template>

<style lang="scss">
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
</style>