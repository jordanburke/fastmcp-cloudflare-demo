#!/usr/bin/env bash
set -euo pipefail

GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ)
VERSION=$(node -p "require('./package.json').version")

DEFINES=(
  --define "__BUILD_VERSION__:\"${VERSION}\""
  --define "__BUILD_GIT_SHA__:\"${GIT_SHA}\""
  --define "__BUILD_TIME__:\"${BUILD_TIME}\""
)

case "${1:-deploy}" in
  dev)
    echo "Starting dev v${VERSION} (${GIT_SHA})"
    wrangler dev "${DEFINES[@]}"
    ;;
  deploy)
    echo "Deploying v${VERSION} (${GIT_SHA}) built at ${BUILD_TIME}"
    wrangler deploy "${DEFINES[@]}"
    ;;
  *)
    echo "Usage: $0 {dev|deploy}"
    exit 1
    ;;
esac
