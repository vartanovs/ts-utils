# TypeScript Utilities 🛠️

This repository contains a collection of utilities written in TypeScript.

## Scripts

- Install Dependencies:                  `npm run install:deps`
- Publish Package Updates:               `npx lerna publish <patch|minor|major>`

### Pull Request Scripts

Opening a Pull Request from a feature branch to the master branch triggers the following four workflow jobs for all updated packages:

- TS -> JS Compilation:                 `npm run test:compile`
- Code Coverage:                        `npm run test:coverage`
- Linting:                              `npm run test:lint`
- Unit Tests:                           `npm run test:unit`

There is a variant of each script that runs for all packages, regardless of whether they have been updated:

- TS -> JS Compilation:                 `npm run test:compile:all`
- Code Coverage:                        `npm run test:coverage:all`
- Linting:                              `npm run test:lint:all`
- Unit Tests:                           `npm run test:unit:all`

## List of Utilities

- **eslint-config-vartanovs-js**        - ESLint configuration for JavaScript development
- **eslint-config-vartanovs-ts**        - ESLint configuration for TypeScript development
- **@vartanovs/redis-client**           - Client to access redis data store
