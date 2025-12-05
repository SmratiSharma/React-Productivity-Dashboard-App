import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "<rootDir>/test/__mocks__/styleMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
