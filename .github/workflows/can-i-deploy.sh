#!/bin/sh

echo """
PACT_BROKER_BASE_URL: $PACT_BROKER_BASE_URL
PACT_BROKER_TOKEN: $PACT_BROKER_TOKEN
APPLICATION_NAME: $APPLICATION_NAME
version: $version
ENVIRONMENT: $ENVIRONMENT
"""

docker run \
  --platform linux/amd64 \
  --rm \
  -e PACT_BROKER_BASE_URL=$PACT_BROKER_BASE_URL \
  -e PACT_BROKER_TOKEN=$PACT_BROKER_TOKEN \
  pactfoundation/pact-cli:latest \
  broker can-i-deploy \
  --pacticipant "$APPLICATION_NAME" \
  --version $version \
  --to-environment $ENVIRONMENT