# ピッチ用ワンパージャ

## 30秒

公式アプリを3つ開かなくても、近くで**いま乗れる一台**がわかる。  
予約・解錠は各社アプリのまま。乗れなかった需要は街と事業者に還元する。

仮称: **ポートなう** · Web · 最初期は福岡

## デモでできること

- GPS（拒否時は天神デモ原点）で近傍ソート
- チャリチャリ / LUUP / ラクすくのフィルタ
- 「社名で乗る」→ 公式へ
- 「これ乗るわ / 乗りたかった」（任意で目的地）
- お気に入り +「使えるヤツ来たら通知」設定

## 正直な限界（必ず言う）

- 満空・ポート座標は**シード（サンプル）**
- 通知の実配信は満空 live 連携後
- スクレイピングしない。正規連携 or 市の実証が本丸

## お願い（市・事業者）

1. チャリチャリ満空の参照（GBFS / 簡易API）パイロット
2. 送客リンクの公式確認
3. 匿名需要レポートの受け皿

## 起動

```bash
cd ~/development/projects/fukuoka-share-ports
pnpm install && pnpm dev
# 公開: Vercel に接続して preview URL
```

## Skills（UI）

- `.cursor/skills/frontend-design/` — Anthropic（命令のみ・採用）
- `.cursor/skills/extract-design-md/` — Google Labs 由来（Bash/npx 除去済み）
- 視覚の正: `DESIGN.md`
