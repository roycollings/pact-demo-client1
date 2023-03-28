#!/bin/sh

echo """
PACT_BROKER_BASE_URL: $PACT_BROKER_BASE_URL
PACT_BROKER_TOKEN: $PACT_BROKER_TOKEN
APPLICATION_NAME: $APPLICATION_NAME
VERSION: $VERSION
ENVIRONMENT: $ENVIRONMENT
"""

docker run \
  --platform linux/amd64 \
  --rm \
  -e PACT_BROKER_BASE_URL=$PACT_BROKER_BASE_URL \
  -e PACT_BROKER_TOKEN=$PACT_BROKER_TOKEN \
  pactfoundation/pact-cli:latest \
  broker record-deployment \
  --pacticipant "$APPLICATION_NAME" \
  --version $VERSION \
  --environment $ENVIRONMENT