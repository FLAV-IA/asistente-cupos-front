module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testEnvironment: 'jsdom',
  globalSetup: 'jest-preset-angular/global-setup'
}
