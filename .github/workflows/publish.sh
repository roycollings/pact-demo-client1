#!/usr/bin/env bash

echo """
PACT_BROKER_BASE_URL: $PACT_BROKER_BASE_URL
VERSION: $VERSION
PACTFILES: $PACTFILES
BRANCH: $BRANCH
"""

docker run --rm \
  -w ${PWD} \
  -v ${PWD}:${PWD} \
  -e PACT_BROKER_BASE_URL=$PACT_BROKER_BASE_URL \
  -e PACT_BROKER_TOKEN=$PACT_BROKER_TOKEN \
  pactfoundation/pact-cli:latest \
  publish $PACTFILES \
  --consumer-app-version $VERSION \
  --branch $BRANCH
