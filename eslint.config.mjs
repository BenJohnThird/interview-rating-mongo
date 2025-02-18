// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config({
    plugins: {
        '@stylistic': stylistic
    },
    files: ["**/*.ts"],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
    ],
    rules: {
        // --------------------------------------------------
        // TypeScript-specific rules
        // https://typescript-eslint.io/rules/
        // --------------------------------------------------
        'no-invalid-this': 'off', // Temporarily disable to see if it resolves the error
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-self-assign": "off",
        "@typescript-eslint/consistent-indexed-object-style": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/prefer-for-of": "off",
        "@typescript-eslint/consistent-generic-constructors": "off",
        "@typescript-eslint/ban-tslint-comment": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/typedef": [
            "error",
            {
                parameter: true,
                propertyDeclaration: true,
            }
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                allowExpressions: true,
                allowIIFEs: true,
            }
        ],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "constructors": "no-public",
                    "accessors": "off",
                }
            }
        ],
        // --------------------------------------------------
        // ESLint-specific rules (JS + TS)
        // https://eslint.style/rules
        // --------------------------------------------------
        "no-self-assign": "off",
        "no-extra-boolean-cast": "off",
        "no-case-declarations": "off",
        "no-useless-escape": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "object-curly-newline": ["error", { "ImportDeclaration": "never", "ExportDeclaration": "never" }],
        // --------------------------------------------------
        // Stylistic rules
        // https://eslint.style/rules
        // --------------------------------------------------
        "indent": ["error", 4],
        "@stylistic/keyword-spacing": "error",
        "@stylistic/semi": "error",
        "@stylistic/block-spacing": "error",
        "@stylistic/type-annotation-spacing": "error",
        "@stylistic/quotes": ["error", "single"],
        "@stylistic/brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true }
        ],
        "@stylistic/object-curly-spacing": ["error", "always"],
        "@stylistic/space-before-function-paren": [
            "error",
            {
                "asyncArrow": "always",
                "anonymous": "never",
                "named": "never",
            }
        ],
        "@stylistic/key-spacing": [
            "error",
            {
                "mode": "strict",
                "afterColon": true
            }
        ],
        "@stylistic/arrow-spacing": "error",
        "@stylistic/type-generic-spacing": "error",
        "@stylistic/newline-per-chained-call": ["error", {ignoreChainWithDepth: 2}],
    },
});
