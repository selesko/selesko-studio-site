# Website contribution instructions

This repository contains the Selesko Studio public website. Studio models and private editorial records are managed separately.

- Preserve existing URLs and approved article text unless the requested change requires an update.
- Use a review branch. Production publication follows review.
- Store optimized approved publication images in images/site; never embed expiring signed image URLs.
- Keep secrets, private workspace identifiers and internal operational documents out of this repository.
- Generate public output with node scripts/build.mjs and inspect desktop and mobile layouts before publishing.
- Only public/ is deployed. Keep source records and internal dashboard files out of that output.
- Record private source-page references and editorial approval in the private studio record.
- See PUBLISHING.md for the publishing process.
