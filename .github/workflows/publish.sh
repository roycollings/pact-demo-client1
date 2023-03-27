#!/usr/bin/env bash

MISSING=()
[ ! "$PACT_BROKER_BASE_URL" ] && MISSING+=("PACT_BROKER_BASE_URL")
[ ! "$PACT_BROKER_TOKEN" ] && MISSING+=("PACT_BROKER_TOKEN")
[ ! "$VERSION" ] && MISSING+=("VERSION")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "ERROR: The following environment variables are not set:"
  printf '\t%s\n' "${MISSING[@]}"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo """
PACT_BROKER_BASE_URL: $PACT_BROKER_BASE_URL
VERSION: $VERSION
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
  --consumer-app-version $VERSION \
  --branch $BRANCH
