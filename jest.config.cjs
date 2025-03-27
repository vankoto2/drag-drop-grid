module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Change to "jsdom" if you are testing DOM-related code
  setupFiles: ["<rootDir>/jest.setup.ts"], // Optional: for environment setup
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
