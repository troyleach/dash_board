/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  coverageDirectory: "coverage",
  verbose: true,
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/?(*_)+(spec|test).[jt]s?(x)',
  ],
  setupFilesAfterEnv: ['./test/init.js'],
  collectCoverageFrom: ['build/**/*.js'],
};
