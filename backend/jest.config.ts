export default {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: true, 
  clearMocks: true, 
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};