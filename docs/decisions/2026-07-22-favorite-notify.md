# お気に入りポートに「使えるヤツが来たら通知」

日付: 2026-07-22

## 決定

全域の「空いたら全部通知」はしない。  
**お気に入り登録したポート**に対してだけ、貸出可能な車両が現れたら通知する。

## Why

- 「通勤で使うあのポート」「よく返すあそこの空き」に絞るとノイズが少ない
- 満空 live がまだ無い段階でも、お気に入り登録と通知フラグは先に貯められる
- Push は Web（Notification / Push API）でもネイティブでも後付け可能

## 依存

| 段階 | 内容 |
|---|---|
| いま | お気に入り + `notifyWhenUsable` を端末保存 |
| 次 | 満空 live（公式連携）をポーリング / webhook |
| その次 | Web Push or ネイティブ通知で配信 |

判定ロジックは `favoritesBecomingUsable`（0/不明 → 1台以上）。

## 実装

- `lib/domain/favorite-port.ts`
- `lib/favorites/store.ts` / `notify.ts`
- `components/favorite-port-controls.tsx`
