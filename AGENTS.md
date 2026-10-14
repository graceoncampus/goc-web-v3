# Guidance for agents and engineers

## Mission comes first

This website exists first to glorify God. Christ must be at the center of every design decision, feature, and change. Grace on Campus is a Christian fellowship at UCLA and a ministry of Grace Community Church, seeking to make disciples, equip believers, evangelize, and exalt Jesus Christ.

The website is an outreach tool for students seeking Christ. Make information about GOC transparent, accessible, accurate, and easy to find so people can learn about the ministry and draw closer to Christ.

The web team serves other members of the body and ministry teams. Build features that support their service without distracting, intruding, or undermining good existing work.

## Philosophy for adding features

Every proposed feature must be evaluated by how it helps people serve and draw closer to Christ. Technical feasibility, convenience, efficiency, or a higher-quality automated result alone do not justify a feature. Within the body of Christ, the heart behind a decision can matter more than its outcome. Decisions that involve personal care, relationships, spiritual discernment, or opportunities to serve must remain with the people entrusted with that work.

Extend and support existing ministry work while preserving its human purpose. Before adding automation, understand why people perform the work, what service and judgment it involves, and whether automating it would remove something spiritually meaningful. Document which responsibilities the feature supports and which decisions must remain human. Ask the engineer when this boundary is unclear. Apply this reasoning to every ministry and new feature, including cases not named here.

**The rides team is an example and precedent for this philosophy.** Never automate the organization or assignment of cars: that work must preserve the team's personal judgment and care. A console may support premaking rides, manually adjusting rides, and sending drivers ride information. Use the same reasoning when evaluating features for other ministries; the rides restriction is not the extent of the principle.

Take a conservative approach to the site's evolution. Major redesigns and substantial changes require thorough engineering reasoning and scrutiny. Before implementing them, document the need, connection to the mission, alternatives, effects on existing ministry work, technical risks, and validation plan, and obtain engineer agreement on the direction. Do not change doctrinal or mission content casually.

## Project context

- Frontend: React 19, TypeScript, Vite, Chakra UI, React Router, and MobX. Reuse existing components, layouts, and theme tokens; favor clear, maintainable code and accessible mobile experiences.
- Both frontend and backend deployment use **AWS Amplify Gen 1 (v1)**. A future migration to Gen 2 (v2) is needed, but requires its own reviewed design and migration plan. Installed package versions do not change the deployment generation.
- Backend: Amplify CLI/CloudFormation, AppSync GraphQL, DynamoDB, Cognito and user groups, API Gateway, Lambda, and S3.
- Key workflows include outreach information, events, sermons, church rides, prayer requests, and member/admin tools.
- Read [website context](docs/website.md), [architecture and deployment](docs/architecture.md), and [onboarding](docs/onboarding.md) before working in those areas.

## Environment and deployment rules

| Environment | Branches | Meaning and restrictions |
| --- | --- | --- |
| `dev` | `main` only | Finalized production despite its name. Availability must be preserved; changes require scrutiny and care. |
| `gamma` | Every non-`main` branch | Development and verification environment. Destructive changes still require explicit engineer verification every time. |

**Agents must never perform manual changes or destructive changes to `dev`.** If necessary, the engineer must execute those actions personally. Agents may prepare reviewable plans and instructions but must not execute them. Do not bypass this restriction through scripts, APIs, console actions, or deployment automation. Destructive production changes require engineer execution even if initiated through the normal pipeline.

Git `gamma`, created from `main`, is the shared development website branch for `gamma.graceoncampus.org`. Git branch names and Amplify backend environment names are separate: Git `gamma` uses backend `gamma`, while Git `main` uses production backend `dev`. Other non-main branches still share backend `gamma`.

Automatic Hosting builds are reserved for Git `main` and `gamma`. Developer branches may build/deploy manually against gamma; keep their Hosting automatic builds disabled when connecting them. Do not add branch guards that prohibit this manual workflow. Automatic branch creation is disabled. This trigger policy does not relax production or destructive gamma restrictions below.

Use the reviewed branch-based Amplify pipeline for ordinary releases. Preparing a change is not permission to publish, merge, or trigger a production deployment. Never deploy `dev` from a non-`main` branch. Verify branch, AWS identity, environment, and resource targets before any cloud mutation; never infer safety from the name `dev`.

For **every destructive `gamma` operation**, explain the exact resources, impact, reason, and recovery plan and obtain explicit engineer verification before execution. Prior approval of another operation does not cover a new destructive action. Resource replacement, deletion, data loss, and destructive schema migrations count as destructive changes. All non-main branches share `gamma`; coordinate changes accordingly.

## Comments

- Comments must explain **why**, rather than restating what code does.
- Keep them minimal: a couple of words where possible; a necessary short explanation should generally not exceed three lines.
- Prefer readable, sensible code. A change, prompt, or commit does not automatically justify a comment.
- Preserve required generated markers and tool-managed headers.

## Fail fast and log clearly

- All code must seek to fail fast. Validate assumptions early and make unexpected failures visible.
- Non-customer-facing code must fail fast and loud: preserve and log full error stacks and causes, then propagate failures or exit unsuccessfully. Never suppress errors, silently continue, or replace diagnostic detail with a simplified message.
- Customer-facing code may and should handle errors gracefully where appropriate: provide an actionable UI state while preserving full diagnostics in the appropriate logging channel. Do not expose internal stacks or secrets to visitors.
- Every error log must include a stack dump whenever available. Normalize non-Error throws so diagnostics remain useful; do not discard the original failure.
- Every code path touching more than one resource must include logging. Every non-obvious side effect must include logging. Record useful operation context, outcomes, and failures without logging credentials, tokens, prayer content, or unnecessary personal data.
- Never weaken tests, assertions, or supporting logic merely to make a change pass. Change them only when they are justifiably wrong; explain the reason and verify the corrected behavior.
- Prefer existing project patterns and focused changes. Preserve unrelated user work. Run checks appropriate to the change and report results accurately. `yarn test` currently runs Vite preview, not automated tests; lint and formatting scripts can modify files.

## Documentation is part of every change

The whole website must be documented under `docs/`. **Update relevant documentation on every change**, including fixes, configuration changes, and documentation-only work.

- Document every page's purpose, hierarchy, and content; update it when any of those change.
- Document infrastructure, every resource and its purpose, dependencies, environment behavior, and operational requirements. Do not put secrets in documentation.
- Every new feature requires a simple design document under `docs/features/` describing purpose, features, and technical details, including infrastructure and frontend changes. Explicitly state when one side needs no changes. Keep the design current with implementation.
- Create a **new file under `docs/journal/`** for every agent change, fix, feature, or action that changes something or assists an engineer with a non-intuitive operation. Use `<date>-<git_username>-<short-descriptive-title>.md`, with the date in `America/Los_Angeles` and the actual GitHub username. Verify identity from available evidence; ask if unknown rather than substituting an email or inventing a handle. Add a suffix to the title when needed to avoid overwriting an entry.
- Journal entries must explain purpose, actions/files, reasoning, verification, environment impact, and follow-up or manual steps. Never record credentials or private member data.
- When the engineer agrees to a lasting practice, update this file and relevant docs in the same task. Keep temporary task decisions in the journal. Correct stale instructions as the project evolves.

Documentation coverage is a continuing requirement. The initial context documents are a starting inventory, not a claim that every existing page or deployed resource has been fully audited.
