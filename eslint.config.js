import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
    {
        "rules": {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: '^_', // Ignore unused function arguments
                    varsIgnorePattern: '^_', // Ignore unused variables
                    caughtErrorsIgnorePattern: '^_', // Ignore unused catch clause parameters
                    ignoreRestSiblings: true, //  Ignore unused properties when using object destructuring
                },
            ]
        }
    },
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
]);
