import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                navigator: 'readonly',
                alert: 'readonly',
                HTMLElement: 'readonly',
                HTMLImageElement: 'readonly',
                IntersectionObserver: 'readonly',
                Image: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'prettier': prettierPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    prettierConfig,
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '.vite/**',
            'tests/**',
            'playwright-report/**',
            'test-results/**',
            '*.config.js',
            '*.config.ts',
        ],
    },
];
