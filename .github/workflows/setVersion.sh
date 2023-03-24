#!/bin/sh
# NOTE: Will only work after actions/checkout
version=$(node -e 'console.log(require("./package.json").version)')
echo version=$version >> $GITHUB_ENV