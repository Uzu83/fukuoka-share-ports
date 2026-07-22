# Design System: ポートなう（仮） / fukuoka-share-ports

**Pitch-ready Web UI · Fukuoka-first share-port hub**

## 1. Visual Theme & Atmosphere

Night dock and bike-lane after rain: deep teal harbor water, warm path lights,
quiet urgency of “find one rideable vehicle now.” Information-dense but calm —
a glanceable field tool, not a marketing splash. Signature: the **live status strip**
and **operator handoff CTA** as the only loud actions.

## 2. Color Palette & Roles

### Primary Foundation
- **Harbor Night** `#0f2a24` — page background
- **Pier Plank** `#16352d` — elevated cards / surfaces
- Radial washes: `#1d4a3c`, `#243b55` — atmosphere only, not brand purple

### Accent & Interactive
- **Dock Light** `#7dcea0` — primary CTA fill text on dark, success / usable
- **Ink Foam** `#f3f7f4` — primary text on dark surfaces
- **Path Mist** `#a8c0b6` — secondary / muted text

### Functional States
- **Caution Lamp** `#f0c674` — low stock / notify-on
- **No-Ride Coral** `#e07a7a` — zero available
- Demo banner: translucent warm wash over Harbor Night (not cream-template)

## 3. Typography Rules

- **Display / UI:** Zen Maru Gothic (rounded Japanese, friendly civic tool)
- Hierarchy: page title ~30px bold; port name ~18px bold; meta 12–14px muted
- Avoid Inter / Roboto / system-ui as the voice of the product

## 4. Component Stylings

### Buttons
- Primary handoff: solid Ink Foam on Harbor Night (`#f3f7f4` on `#0f2a24` text inverse) — “チャリチャリで乗る”
- Signal actions: bordered, quieter — “乗るわ / 乗りたかった”
- Favorite chips: pill, accent border when active

### Cards
- Rounded-2xl, hairline white/10 border, Pier Plank fill
- No heavy multi-layer shadows; reliance on surface contrast

### Banners
- Demo honesty banner always first viewport-adjacent
- GPS status as small utility line

### Filters
- Operator toggles as selectable pills (selected = Dock Light border/fill tint)

## 5. Layout Principles

- Max width ~32rem (mobile-first single column)
- Edge padding 16px; card stack gap 12px
- Touch targets ≥ 40px height on primary actions
- `prefers-reduced-motion`: disable non-essential transitions

## 6. Pitch / Product Notes

- Hero thesis: **横断で「いま乗れる一台」** — not a fake full map product
- Always disclose demo/seed availability until live feeds exist
- Hand ride/reservation to operator apps; we are the hub
