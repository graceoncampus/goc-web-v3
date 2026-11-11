# Add admin user management UI

## Purpose

Second step of integrating `feature/admin-user-management`: bring its `/admin` page and login-menu link onto gamma, now that the hardened API is deployed. Only the admin pieces are ported; that branch's gallery, events, nav, Sermons, package, and `checkIsLoggedIn` changes are left out.

## Earlier deploy result (infra branch)

PR #161 (`infra/admin-user-management`) merged into gamma as `c39ca9b`. Gamma Hosting job 10 succeeded (BUILD, DEPLOY, VERIFY). The gamma root stack updated 2026-10-28 03:54:44–03:55:30 UTC to `UPDATE_COMPLETE`; `adminUserManagement-gamma` code changed at 03:54:57 UTC and its deployed `index.js` matched `c39ca9b`. No production resources changed.

## Actions and files

- Branch `feature/admin-ui` from `origin/gamma` at `b16dbe9` (upstream unset).
- `src/pages/Admin.tsx` (new): ported from the feature branch with these changes, agreed with the engineer:
  - explicit Edit, Save, and Cancel buttons instead of click-cell editing and save-on-click-outside, so access changes are deliberate and keyboard accessible;
  - stops at the first failed change, names it with the API's reason, and always reloads users;
  - typed responses; no console logging of user data; errors logged with stacks;
  - `BannerTemplate` with a horizontally scrolling table instead of a fixed 750px box in `LoginTemplate`, whose 6rem padding is too wide for phones.
- `src/App.tsx`: `/admin` route.
- `src/auth/CheckUser.tsx`: `checkIsAdmin`, matching the existing group helpers.
- `src/components/LoginButton.tsx`: Admin menu item for `Admin` members. The file keeps its existing CRLF line endings.
- `docs/features/admin-user-management.md`, `docs/website.md`.

No backend, package, or configuration changes.

## Verification

`tsc --noEmit` passed, Prettier passed on the new and touched LF files, and `vite build` succeeded (existing chunk-size warning only). The page was not run locally: the local `src/amplifyconfiguration.json` targets the production pool and lacks `adminUserManagement`, so local testing would need a gamma config pull first.

## Environment impact

None until merged. Merging into gamma triggers a gamma Hosting build; production is unaffected.

## Follow-up and manual steps

- Add the test account to gamma pool `us-west-2_ppQ8GSVxo`'s `Admin` group in the Cognito console (the site cannot grant `Admin`), then log out and back in.
- On gamma, check that an admin sees the menu link, the list loads, a RidesTeam change saves, and `Admin` is read-only. Check that a non-admin gets no link, sees "Access denied" at `/admin`, and gets 403 from the API.
- Production follows only through a reviewed `main` release.
