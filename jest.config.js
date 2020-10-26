module.exports = {
  clearMocks: true,                                 // Clear mock calls between every test
  collectCoverageFrom: ['packages/**/*.ts'],        // Generate coverage report from packages dir
  coverageDirectory: 'coverage',                    // Specify coverage report output dir
  roots: ['<rootDir>/packages'],                    // All test files are in the packages directory
  testRegex: '.+\.test\.ts$',                       // Look for file.test.ts files
  transform: {
    '^.+\\.ts$': 'ts-jest',                         // Specify use of ts-jest for all .ts files
  },
  verbose: false,                                   // Specify whether to report each individual test
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",                    // Use tsconfig for ts-jest
    },
  },
  moduleFileExtensions: ['js', 'ts'],
};
