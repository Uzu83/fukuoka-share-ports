---
name: extract-design-md
description: >-
  Extract a DESIGN.md design system from frontend source (colors, type,
  components, layout). Adapted from Google Labs stitch-skills extract-design-md.
  Read/Write only — Bash and Stitch MCP tools removed for safety.
---

# Extract Design System from Frontend Code (sanitized)

> **Provenance / safety (2026-07-22)**
> - Upstream: https://github.com/google-labs-code/stitch-skills (skill `extract-design-md`)
> - Trust: Google Labs official org; skill body is documentation workflow
> - **Sanitized for this repo:**
>   - Removed `allowed-tools: Bash` and `stitch*:*`
>   - No `npx`, no install scripts, no network fetches required
>   - Agent may only **Read** source and **Write** `DESIGN.md`
> - Do **not** run upstream `npx skills add ...` installers without human review

Analyze frontend source to produce `DESIGN.md` capturing visual language.

## When to Use

- Document or audit this app's visual system
- Pitch / design handoff needs a single design source of truth

## Workflow (Read-only analysis)

1. Read `package.json`, `app/globals.css`, `app/layout.tsx`, page/components under `app/` and `components/`
2. Extract:
   - Atmosphere (mood, density, temperature)
   - Color roles (foundation, accent, text, states) with hex
   - Typography (families, scale, weights)
   - Components (buttons, cards, filters, banners)
   - Layout (max-width, spacing, mobile-first)
3. Write `DESIGN.md` at project root (not `.stitch/` unless asked)

## Output requirements

- Every color: descriptive name + hex + role
- Capture intent, not a dump of every class
- No near-duplicate colors without consolidating
- Japanese UI copy context is allowed in notes

## Forbidden while using this skill

- `curl | sh`, `npx` installers, downloading remote scripts
- Deleting files, force-push, lockfile edits
- Calling external MCP servers not already authenticated by the human
