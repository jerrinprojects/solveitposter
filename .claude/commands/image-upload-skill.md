---
name: image-upload-skill
description: Add user-friendly image upload, preview, replace, and remove flows for poster cards.
---

When implementing image upload in poster-style pages:

Primary goal:
Allow the user to insert images easily while preserving layout stability and print quality.

Rules:
- Use a file input with accept="image/*".
- Show a clear placeholder before upload.
- Display immediate preview after upload.
- Preserve image aspect ratio.
- Use object-fit appropriately:
  - object-contain when preserving full image matters
  - object-cover only if cropping is intentional
- Keep the card size stable even when no image exists.
- Provide a replace image action.
- Provide a remove image action.
- Ensure the upload UI is hidden during print.
- Ensure the image itself remains visible during print.
- Add accessible alt text where possible.
- Keep section image states independent.

UX guidance:
- Placeholder should be friendly and obvious.
- Upload controls should be easy to find.
- Replace/remove actions should not visually dominate the card.
- The layout should not jump too much when an image appears.

Do not:
- Do not distort images.
- Do not let oversized images break the layout.
- Do not hide the image itself in print mode.
- Do not make the upload interaction overly complex for basic use cases.

Preferred baseline:
- local preview via URL.createObjectURL for prototype version
- modular image card component
- stable height container
