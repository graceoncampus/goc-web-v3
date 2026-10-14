# Website purpose and page inventory

The website places Christ first, welcomes students seeking Him, makes GOC information accessible, and supports the body's ministry work. Every new feature must support personal service, care, and judgment. Preserve spiritually meaningful human responsibilities even when automation could improve efficiency or outcomes. The rides team's car organization is an example and precedent for this philosophy, which applies across all ministries and features. See [AGENTS.md](../AGENTS.md) for mission and engineering requirements.

Routes below capture the local Git dev `src/App.tsx`. Groupings describe information hierarchy; they are not a verified inventory of navbar order or access permissions. The main-based Amplify publication preserves main's frontend: main and the gamma website built from it do not yet include the gallery or admin routes below, and main includes a `/recurring-events` redirect to `/events`. Publishing backend definitions alone does not enable the missing frontend pages. Page descriptions are an initial purpose/content inventory to expand when inspecting each page.

| Area | Route | Purpose and content |
| --- | --- | --- |
| Welcome | `/` | Introduction to GOC and ways to participate. |
| Ministry information | `/about` | Ministry mission, church relationship, fellowship, welcome resources. |
| Ministry information | `/ourbeliefs` | GOC's stated beliefs. |
| Ministry information | `/leadership` | Ministry leadership information. |
| Ministry participation | `/events` | Event information and participation resources. |
| Ministry participation | `/smallgroups` | Small-group information. |
| Ministry participation | `/ministryteams` | Ministry-team information and contacts. |
| Ministry participation | `/rides` | Church ride signup and coordination tools. Human judgment must govern car organization. |
| Ministry participation | `/prayer-request` | Prayer submission form. Treat submitted content as sensitive. |
| Teaching/resources | `/sermons` | Sermon access. |
| Teaching/resources | `/john-study-guide` | John study resources. |
| Community | `/gallery` | Ministry gallery in Git dev; absent from the preserved main frontend. |
| External resources | `/links` | Redirect to GOC's Linktree. |
| Account | `/login`, `/signup`, `/reset` | Sign-in, account creation, password reset. |
| Account | `/profile` | Member profile. |
| Administration | `/admin` | User/group administration in Git dev; checks `Admin` membership. Absent from the preserved main frontend. |
| Redirect | `/recurring-events` | Main redirects this older URL to `/events`. |
| Fallback | Unmatched routes | Not-found page. |

`WelcomeWeek.tsx` exists, but its `/welcome-week` route is commented out. Do not document it as an active page without enabling and verifying the route.

Update this inventory for every route, hierarchy, or content change. Detailed page documentation should capture audience, content sections, navigation relationships, data sources, permissions, and meaningful failure states. Existing detail coverage is incomplete and must grow with engineering work.

## Feature design documents

Every new feature requires `docs/features/<short-descriptive-title>.md` with purpose and relationship to the mission, proposed features, human decisions preserved, frontend details, infrastructure/backend details, validation, and deployment implications. Explain how the feature supports existing ministry work and why any proposed automation preserves opportunities for personal care and service. Efficiency alone does not justify replacing human responsibilities. State explicitly when no frontend or infrastructure change is needed. Major changes also need alternatives, risks, and engineer agreement before implementation.
