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
# Import existing metadata without pulling over repository definitions.
aws_config='{"configLevel":"project","useProfile":true,"profileName":"default","AmplifyAppId":"d1afaiv4wnjkx7"}'
amplify env import --name "$target_env" --config "$STACKINFO" --awsInfo "$aws_config" --yes
amplify init --amplify "{\"envName\":\"$target_env\",\"appId\":\"d1afaiv4wnjkx7\"}" \
  --providers "{\"awscloudformation\":$aws_config}" \
  --codegen '{"generateCode":false,"generateDocs":false}' --yes
amplify push --yes
