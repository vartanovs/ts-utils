#!/bin/bash

set -ex

npm run clean:deps
npm install -D -E lerna@6.6.2 --no-package-lock
npx lerna bootstrap --hoist
