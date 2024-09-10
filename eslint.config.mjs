import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['src/**/*.js'],
        languageOptions: { globals: globals.node },
        rules: {
            semi: 'error',
            'no-unused-vars': ['error', { args: 'none' }],
            'no-undef': 'error',
        },
    },
];
