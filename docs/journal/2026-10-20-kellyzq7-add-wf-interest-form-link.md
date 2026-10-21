# Add WF interest form link

## Purpose

The engineer asked to point the new landing-page "WF Interest" info box at the WF interest Google Form, replacing the `#` placeholder, then commit and push the feature branch.

## Actions and files

- `src/constants/Links.tsx`: set `WF_INTEREST_FORM_LINK` to the Google Form URL and removed the TODO.
- Committed the engineer's existing landing-page changes (`Landing.tsx`, `InfoBox.tsx`, `OutlineButton.tsx`) together with the link.
- Added `docs/features/wf-interest-form.md` and updated the `/` row in `docs/website.md`.
- Unstaged an accidentally staged `env` file; the engineer's `.env` is gitignored and was not committed.
- Fast-forwarded `feature/wf-interest-form` to `origin/main` (06af751) before committing; no overlapping files.

## Reasoning

The link is a constant alongside the other Google Form links. The button opens externally in a new tab so visitors keep the site open.

## Verification

Ran the Vite dev server locally at `http://localhost:3000/`; it started without errors. Visual check of the box and button was left to the engineer.

## Environment impact

Frontend only. Pushed `feature/wf-interest-form`; developer branches have automatic Hosting builds disabled, so no deployment was triggered. No changes to `dev` or `gamma` backends.

## Follow-up

Open a PR to `main` for review when ready.
