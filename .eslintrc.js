module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential', // ou 'plugin:vue/vue3-strongly-recommended' ou 'plugin:vue/vue3-recommended' pour des règles plus strictes
        // Ajoute d'autres configurations ou plugins selon les besoins, par exemple 'plugin:prettier/recommended' pour Prettier
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false, // Permet d'éviter l'erreur de fichier de config Babel non détecté
        ecmaVersion: 2021, // Assure la compatibilité avec les fonctionnalités les plus récentes d'ECMAScript
        sourceType: 'module' // Permet l'utilisation de modules ES6
    },
    rules: {
        // Personnalise les règles ici. Exemples:
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // Ajoute d'autres règles personnalisées selon les besoins de ton projet
    }
};
