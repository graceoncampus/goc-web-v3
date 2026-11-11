# Clarify event image upload errors

The offline preview displayed a placeholder as “Current URL” even with the form closed. Removed the placeholder and debug label. Added instructions explaining that the failure checkbox only affects a selected photo on submission. The shared event form now explains that a failed upload prevented the save, keeps the selected photo, and gives retry and manual-link options.

Rebuilt the offline preview and verified the mock failure and retry flow. No backend, IAM, or deployment changes.
