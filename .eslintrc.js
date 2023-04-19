

const vueSettings = {
    "no-unused-vars": 1,
    "indent": "off",
    "vue/html-indent": ["warn", 4],
    "no-duplicate-imports": 2,
    "unused-imports/no-unused-imports": 2,
    "vue/valid-attribute-name": "off",
    "vue/valid-model-definition": "off",
    "vue/no-mutating-props": 1,
    "vue/require-v-for-key": 1,
    "vue/no-unused-components": 1,
    "vue/multi-word-component-names": 1,
    "vue/no-unused-components": 1,
    "vue/no-unused-vars": 1,
};

const jsSettings = {
    "no-unused-vars": 1,
    "no-duplicate-imports": 2,
    "unused-imports/no-unused-imports": 2,
    "no-trailing-spaces": 1,
    "indent": [1, 4],
};

module.exports = {
    root: true,
    extends: [
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { "project": ["./tsconfig.json"] },
    plugins: [
        "unused-imports",
    ],
    rules: jsSettings,
    ignorePatterns: ["src/**/spec.js", "**/*.conf.js", ".eslintrc.js", "webpack.config.js", "run-calc.js"],
    env: {
        browser: true,
        node: false,
    },
    overrides: [
        {
            files: ["src/web/**/*.js","src/web/**/*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: { "project": ["./src/web/tsconfig.json"] },
        },
        {
            files: ["src/web/**/*.vue"],
            parser: "vue-eslint-parser",
            parserOptions: {
                "parser": {
                    "js": "espree",
                    "ts": "@typescript-eslint/parser",
                    "<template>": "espree",
                },
                "project": "./src/web/tsconfig-eslint.json"
            },
            extends: [
                'plugin:vue/recommended',
                "@vue/typescript/recommended"
            ],
            rules: vueSettings,
        }
    ]
};