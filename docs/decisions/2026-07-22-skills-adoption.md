# Skills adoption (safety review)

日付: 2026-07-22

## 採用

| Skill | 出どころ | 判断 |
|---|---|---|
| `frontend-design` | anthropics/skills | **採用**。Markdown のみ。スクリプトなし |
| `extract-design-md` | google-labs-code/stitch-skills | **採用（消毒）**。上流は `Bash` / `stitch*` を許可リストに含むが、**本文に悪意あるコマンドは無し**。当リポでは Bash・Stitch MCP・`npx skills add` を削除した写しだけ置く |

## 採用しなかったもの

- `npx @lhi/ui-skill` 等の **インストーラ実行**（中身をその場で検証できない）
- Stitch MCP 必須の design-md / upload 系（このプロジェクトに Stitch 未接続）

## ルール

- Skill は **git にコミットした Markdown だけ**を信頼する
- 上流更新を取り込むときは diff で `curl|`, `rm -rf`, `eval`, 不明 `npx` を目視
