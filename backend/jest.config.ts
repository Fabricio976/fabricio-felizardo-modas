export default {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: true, 
  clearMocks: true, 
  coverageProvider: "v8",
  matchTestMatch: ["**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};