#!/usr/bin/env bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo """
PACT_BROKER_BASE_URL: $PACT_BROKER_BASE_URL
version: $version
pactfiles: $pactfiles
BRANCH: $BRANCH
"""

docker run --rm \
  -w ${PWD} \
  -v ${PWD}:${PWD} \
  -e PACT_BROKER_BASE_URL=$PACT_BROKER_BASE_URL \
  -e PACT_BROKER_TOKEN=$PACT_BROKER_TOKEN \
  pactfoundation/pact-cli:latest \
  publish ./src/pact/pactfiles \
  --consumer-app-version $version \
  --branch $BRANCH
