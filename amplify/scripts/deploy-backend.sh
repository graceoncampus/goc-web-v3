#!/usr/bin/env bash
set -euo pipefail

# Hosting supplies AWS_BRANCH. Never silently select a production environment.
: "${AWS_BRANCH:?AWS_BRANCH must be supplied by Amplify Hosting}"
if [[ "$AWS_BRANCH" == "main" ]]; then
  target_env=dev
else
  target_env=gamma
fi

if [[ "${1:-}" == "--print-target" ]]; then
  printf '%s\n' "$target_env"
  exit 0
fi

export AWS_MAX_ATTEMPTS=1
STACKINFO="$(node amplify/scripts/hosting-stack-info.js "$target_env")"
export STACKINFO
node amplify/scripts/prepare-environment.js "$target_env"
# --simple imports the existing environment before deploying the checked-in
# backend definitions. Do not pull the deployed definitions over this checkout.
amplifyPush --environment "$target_env" --simple
