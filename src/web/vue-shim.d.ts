declare module "*.vue" {
    import { defineComponent } from "vue/dist/vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
