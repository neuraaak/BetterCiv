import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.vue'],
        plugins: {
            vue,
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parser: vue.parser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                parser: tsparser,
            },
        },
        rules: {
            ...vue.configs.recommended.rules,
            'no-console': 'off',
            'no-debugger': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tseslint,
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parser: tsparser,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'no-console': 'off',
            'no-debugger': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'off',
        },
    },
];
