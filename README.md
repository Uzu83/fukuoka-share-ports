# ポートなう（仮） / fukuoka-share-ports

**チャリチャリ / LUUP / ラクすく**などの近くのポートと、貸出できそうかをまとめて見る Web アプリ。

最初期の検証エリアは **福岡**。全国（多都市）展開を想定。

## ピッチ用デモ

```bash
cd ~/development/projects/fukuoka-share-ports
pnpm install
pnpm dev
pnpm check
```

- ピッチ原稿: [docs/PITCH.md](docs/PITCH.md)
- デザイン正: [DESIGN.md](DESIGN.md)
- UI skills（消毒済み）: `.cursor/skills/`

## いまの状態

- GPS（拒否時は天神デモ）で近傍ソート
- ピッチ用デモバナー（満空はサンプルと明示）
- 事業者フィルタ / 乗るわ・乗りたかった / 各社アプリ誘導 / お気に入り
- リアルタイム満空は未接続（公式連携待ち）

## データ方針

本番の満空は **公式 API / 提携 / 公開データ** のみ。スクレイピングはしない。
