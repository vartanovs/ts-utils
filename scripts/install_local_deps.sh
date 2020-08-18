#!/bin/bash

set -ex

rm -rf node_modules
npm install --no-package-lock
npx lerna bootstrap --hoist
