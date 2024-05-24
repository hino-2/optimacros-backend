/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  // globalSetup: './TestsEnv/index.ts',
  setupFilesAfterEnv: ['./TestsEnv/jest.setup.ts'],
};
