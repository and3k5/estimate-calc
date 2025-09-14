import { fileURLToPath } from "node:url";

import viteConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import { resolve } from "node:path";

export default mergeConfig(
    viteConfig,
    defineConfig({
        root: "./src/lib",
        build: {
            outDir: resolve(__dirname, "dist"),
            rollupOptions: {
                preserveEntrySignatures: "allow-extension",
                treeshake: {
                    moduleSideEffects: true,
                },
            },
            lib: {
                entry: fileURLToPath(new URL("./src/lib/index.ts", import.meta.url)),
                name: "calc",
                fileName: "calc",
                formats: ["cjs"],
            },
        },
    }),
);
