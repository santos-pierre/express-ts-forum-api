/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js'],
    setupFiles: ['dotenv/config'],
};
