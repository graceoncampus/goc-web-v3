# Amplify Gen 1 backend

`backend/` contains the shared infrastructure definitions. Production is named
`dev` and is reserved for reviewed main-branch releases. Every non-main branch
targets shared `gamma`; the pre-push hook checks both the branch and provider
stack. Agents must keep production read-only under [AGENTS.md](../AGENTS.md).

Use AWS profile `goc` locally. Local provider information, secrets, environment
metadata, and generated client configuration are ignored by Git. Preserve local
work before pulling a backend. Do not initialize a second project or use force
flags to bypass deployment guards.

See [architecture](../docs/architecture.md),
[gamma design](../docs/features/gamma-backend.md), and
[onboarding](../docs/onboarding.md). `scripts/seed-gamma.py` is a guarded one-time
data copy, not part of routine deployments. All non-main branches share gamma;
it is not reseeded on each deployment.
