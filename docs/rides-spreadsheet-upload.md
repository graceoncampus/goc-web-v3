# Rides spreadsheet upload troubleshooting

The `/rides` page provides church ride information and tools for the rides team to import a Google spreadsheet containing manually prepared cars, a ride date, and a driver email message. Car organization and assignment remain the rides team's responsibility.

The import calls the `updateRides` API and Lambda. `gsheets.js` authenticates with a Google service account, loads spreadsheet metadata, and reads the first worksheet. Spreadsheet loading happens before existing rides are deleted or new rides and driver emails are processed. A loading failure therefore stops this request before ride changes.

## Google permission errors

“Failed to upload” with “Issue loading spreadsheet. Check the spreadsheet link.” is a generic message. An engineer can inspect the appropriate environment's `updateRides` CloudWatch log for the underlying Google error without rerunning an import.

A Google `403` with “The caller does not have permission” means the caller cannot access the requested sheet. Verify the submitted link points to the intended spreadsheet. Its owner should share that spreadsheet with the Google service-account email configured in the target Lambda's `VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL`, granting Viewer access for this read-only spreadsheet import. Sharing with the engineer's personal Google account alone does not give the backend access. Keep the sheet restricted; do not publish member information or enable public link access. Workspace sharing restrictions may require assistance from the Google administrator.

Read only the email configuration field when troubleshooting; never print or document the private key. Production configuration changes must be performed personally by an engineer under the repository's environment rules.

After access is corrected, the rides team can retry its intended upload. A successful import replaces rides and may send driver emails, so retry only when the prepared assignments, date, and message are ready.

No frontend, backend, or infrastructure changes are required to resolve spreadsheet sharing permissions. The current loader uses the first worksheet regardless of the URL's `gid`.
