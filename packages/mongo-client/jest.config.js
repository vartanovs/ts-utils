const config = require('../../jest.config');

module.exports = {
  ...config,
  collectCoverageFrom: ['src/**/*.ts'],       // Generate coverage report from src dir
  roots: ['<rootDir>/tests'],                 // All test files are in the tests directory
};
