---
name: print-css-skill
description: Apply print-optimized CSS for poster-style websites and PDF export through browser print.
---

When building printable pages, optimize for browser print and PDF export.

Primary goal:
The webpage should print cleanly as an A4 poster-like document.

Rules:
- Use window.print() for export flow.
- Add @media print styles.
- Add @page settings for A4 portrait unless told otherwise.
- Hide controls during print:
  - buttons
  - file inputs
  - editing panels
  - upload controls
  - toolbars
- Use a consistent .no-print utility class for all non-printable UI.
- Remove shadows in print mode.
- Ensure text remains readable in print.
- Keep cards from breaking awkwardly across pages.
- Use break-inside: avoid for key content blocks where appropriate.
- Remove unnecessary background effects that reduce print quality.
- Ensure margins are controlled and predictable.

Print checklist:
- Is A4 size defined?
- Are print-only or screen-only elements separated?
- Are all controls hidden in print?
- Are cards splitting badly across pages?
- Is the page still visually balanced in print preview?
- Are borders and spacing still visible on paper/PDF?

Do not:
- Do not rely on screenshot-style PDF export as the default.
- Do not keep floating buttons visible in print.
- Do not allow essential cards to break mid-content when avoidable.
- Do not use dark backgrounds with low-contrast text for print pages.

Preferred implementation:
- @page { size: A4 portrait; margin: 10mm; }
- @media print { ... }
- utility class for hidden-on-print behavior
