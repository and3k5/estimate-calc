const vuePluginSettings = {
    "vue/no-mutating-props": 1,
    "vue/require-v-for-key": 1,
    "vue/no-unused-components": 1,
    "vue/multi-word-component-names": 1,
    "vue/no-unused-components": 1,
};


const vueSettings = Object.assign({}, vuePluginSettings, {
    "no-unused-vars": 1,
    "indent": "off",
    "no-duplicate-imports": 2,
    "unused-imports/no-unused-imports": 2,
});

const jsSettings = Object.assign({}, vuePluginSettings, {
    "no-unused-vars": 1,
    "vue/no-unused-vars": 1,
    "no-duplicate-imports": 2,
    "unused-imports/no-unused-imports": 2,
    "no-trailing-spaces": 1,
    "indent": [1, 4],
});

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { "project": ["./tsconfig.json"] },
    plugins: [
        "unused-imports",
        "typescript"
    ],
    rules: jsSettings,
    ignorePatterns: ["src/**/spec.js","**/*.conf.js"],
    env: {
        browser: true,
        node: false,
    },
    overrides: [
        {
            files: ["*.vue"],
            extends: [
                'plugin:vue/recommended'
            ],
            rules: vueSettings,
        }
    ]
};