import js from '@eslint/js';
import vue from 'eslint-plugin-vue';

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
            parser: vue.parser,
        },
        rules: {
            ...vue.configs.recommended.rules,
            'no-console': 'off',
            'no-debugger': 'off',
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'off',
        },
    },
];
