import { fileURLToPath } from "node:url";

import viteConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import { resolve } from "node:path";

export default mergeConfig(
    viteConfig,
    defineConfig({
        root: "./src/web",
        build: {
            outDir: resolve(__dirname, "dist"),
            rollupOptions: {
                input: fileURLToPath(new URL("./src/web/index.html", import.meta.url)),
            },
        },
    }),
);
