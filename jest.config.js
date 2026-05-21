module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterSetup: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: ['src/app/**/*.ts', '!src/app/**/*.spec.ts'],
};
