# WF interest form link

## Purpose and relationship to the mission

Give students visiting the welcome page a direct way to tell GOC they are interested in WF. The form only collects interest; follow-up, welcome, and relationships remain with the people who serve in that ministry.

## Features

- A "WF Interest" info box on the landing page (`/`), beside the existing info boxes, with a "SIGN UP" button.
- The button opens the WF interest Google Form in a new tab.

## Human decisions preserved

Nothing is automated. Responses go to the Google Form owned by the ministry team, who decide how to reach out to each person.

## Frontend details

- `src/constants/Links.tsx`: `WF_INTEREST_FORM_LINK` holds the Google Form URL.
- `src/pages/Landing.tsx`: adds the `InfoBox`; the info box row's max width grows from `70rem` to `80rem` to fit a fourth box.
- `src/components/InfoBox.tsx`: optional `isExternal` prop passed to `OutlineButton`; horizontal padding at `lg`/`xl` reduced to fit four boxes.
- `src/components/OutlineButton.tsx`: optional `isExternal` prop sets `target="_blank"` and `rel="noopener noreferrer"`.

## Infrastructure/backend details

No infrastructure or backend changes. Form responses are stored by Google Forms, outside this site.

## Validation and deployment

Verify locally with `npm start` (or `yarn start`) that the box renders on `/` across breakpoints and the button opens the form in a new tab. Ships through the normal frontend release pipeline; no backend deployment is involved.
