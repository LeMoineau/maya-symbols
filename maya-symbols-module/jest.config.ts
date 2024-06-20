export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
