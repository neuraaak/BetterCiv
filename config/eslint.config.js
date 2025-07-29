import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module'
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'off'
        }
    }
]; 