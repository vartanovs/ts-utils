module.exports = {
  clearMocks: true,                                 // Clear mock calls between every test
  collectCoverageFrom: ['packages/**/*.{js,ts}'],   // Generate coverage report from packages dir
  coverageDirectory: 'coverage',                    // Specify coverage report output dir
  roots: [ '<rootDir>/packages' ],                  // All package files are in the src directory
  testRegex: '.+\.test\.ts$',                       // Look for file.test.ts files
  transform: {
    '^.+\\.ts$': 'ts-jest',                         // Specify use of ts-jest for all .ts files
  },
  verbose: false,                                   // Specify whether to report each individual test
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",                    // Use tsconfig for ts-jest
    },
  },
  moduleFileExtensions: ['js', 'ts'],
};
