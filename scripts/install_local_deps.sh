#!/bin/bash

set -ex

rm -rf node_modules
npm install -D -E lerna@3.22.1 --no-package-lock
npx lerna bootstrap --hoist
