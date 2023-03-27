#!/bin/sh
# NOTE: Will only work after actions/checkout
VERSION=$(node -e 'console.log(require("./package.json").version)')
echo version=$VERSION >> $GITHUB_ENV