module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off'
    }
};
