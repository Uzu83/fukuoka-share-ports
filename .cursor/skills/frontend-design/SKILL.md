---
name: frontend-design
description: >-
  Guidance for distinctive, intentional visual design when building new UI.
  Source: anthropics/skills (frontend-design). Content-only — no scripts.
license: See upstream LICENSE at anthropics/skills
---

# Frontend Design

> **Provenance / safety (2026-07-22)**
> - Upstream: https://github.com/anthropics/skills/tree/main/skills/frontend-design
> - Trust: Anthropic official skills repo; **Markdown instructions only**
> - **No installers, no Bash, no network commands in this file**
> - Adopted for pitch-ready UI work on this project

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there's any information in your memory about the human's preferences, context about what they're building, or designs you've made before – use that as a hint. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing.

Structure is information. Structural devices should encode something true about the content, not decorate it.

Leverage motion deliberately. Prefer one orchestrated moment over scattered effects. Respect `prefers-reduced-motion`.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision.

## Avoid AI-default clusters

Do not default to: (1) warm cream + terracotta serif; (2) near-black + acid-green/vermilion; (3) broadsheet hairline newspaper layout; (4) purple-on-white / purple-indigo gradients; (5) Inter/Roboto/Arial/system as display.

## Process

Work in two passes: (1) compact token plan — color, type, layout, signature; (2) critique for generic defaults, then build from tokens only.

Spend boldness in one place. Signature element memorable; everything else quiet. Responsive to mobile, visible keyboard focus, reduced motion respected.

## Writing

Write from the end user's side. Active voice. Labels name outcomes. Failure and empty states give direction, not apology filler.
