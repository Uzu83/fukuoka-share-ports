# Design System: ポートなう（仮） / fukuoka-share-ports

**Pitch-ready Web UI · Fukuoka-first share-port hub**

## 1. Visual Theme & Atmosphere

Night harbor after rain: deep teal water, soft path lights, quiet urgency of
“find one rideable vehicle now.” Calm field tool, not a marketing splash.
Signature: the **live status pill**, **trend rail**, and **operator handoff CTA**.
Atmosphere via layered radial washes, film grain, glass surfaces, and a faint
dock-line texture. Typography pair: Shippori Mincho (brand) + Zen Maru (UI).

## 2. Color Palette & Roles

### Primary Foundation
- **Harbor Night** `#071612` / mid `#0c211c` — page background stack
- **Pier Plank** gradient on cards (`#163229` → `#0e221c`) — elevated surfaces
- Radial washes: `#14352c`, `#132433` — atmosphere only (not brand purple)

### Accent & Interactive
- **Dock Light** `#8fd9ad` — usable status, active filters, signal confirmation
- **Ink Foam** `#f2f7f4` — primary text; inverse fill for primary CTA
- **Path Mist** `#8fa89c` / **Faint** `#6a8276` — secondary / meta

### Functional States
- **Caution Lamp** `#e2c07a` — low stock / notify-on
- **No-Ride Coral** `#d98888` — zero available
- Demo honesty band: notice surface + caution label (not cream-template)

### Tokens (`globals.css`)
`--bg`, `--bg-mid`, `--bg-elevated`, `--line`, `--line-strong`, `--ink`,
`--muted`, `--faint`, `--accent`, `--accent-dim`, `--warn`, `--warn-dim`,
`--bad`, `--bad-dim`, `--radius-card`, `--radius-control`, `--shadow-card`

## 3. Typography Rules

- **Brand display:** Shippori Mincho (editorial weight on product name only)
- **UI / body:** Zen Maru Gothic (rounded Japanese, civic tool)
- Hierarchy: brand mark ~2.45–2.75rem; port name ~1.1rem bold; meta 12–13px faint
- Avoid Inter / Roboto / system-ui as the voice of the product

## 4. Component Stylings

### Buttons
- `.btn-primary` — Ink Foam on Harbor Night, full-width handoff (“〜で乗る”)
- `.btn-ghost` — bordered, quieter signals and secondary links
- `.btn-quiet` — pill chips for favorite / notify (`data-on`, optional `data-tone="warn"`)

### Cards
- `.port-card` — interaction container only; hairline border, soft shadow, usable tint
- Status: `.status-pill` with `data-tone` = `ok` | `low` | `bad` | `muted`

### Filters & notices
- `.filter-chip` — operator toggles (`data-on`)
- `.notice` — demo honesty / empty states

### Trend rail
- `.trend-rail` / `.trend-card` — horizontal snap shelf（いま熱いエリア）
- Heat bar from availability + terminal signals (`rankAreaTrends`)
- Tap filters the nearby list; tap again clears

### Motion
- `.reveal` / `.reveal-delay-*` — short rise-in; respect `prefers-reduced-motion`

## 5. Layout Principles

- Max width ~32rem (mobile-first single column)
- Edge padding 20px; section gap 32px; card stack gap 12px
- Touch targets ≥ 40px height on primary actions
- First viewport: brand, one supporting line, feedback CTA, demo honesty — no stats strips

## 6. Pitch / Product Notes

- Hero thesis: **横断で「いま乗れる一台」** — not a fake full map product
- Always disclose demo/seed availability until live feeds exist
- Hand ride/reservation to operator apps; we are the hub
