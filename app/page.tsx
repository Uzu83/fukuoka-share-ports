import { PortSignalActions } from "@/components/port-signal-actions";
import { SEED_PORTS } from "@/lib/data/seed-ports";
import { OPERATORS, type OperatorId } from "@/lib/domain/operator";
import { isLikelyUsable } from "@/lib/domain/port";
import { rankNearbyPorts } from "@/lib/ports/nearby";

/** デモ原点: 天神交差点付近。将来は端末 GPS / クエリに差し替え。 */
const DEMO_ORIGIN = { lat: 33.5902, lng: 130.3987 };

const OPERATOR_ORDER: OperatorId[] = ["charichari", "luup", "rakusuku"];

function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function availabilityLabel(n: number | null): { text: string; tone: string } {
  if (n === null) return { text: "不明", tone: "text-[var(--muted)]" };
  if (n <= 0) return { text: "貸出 0", tone: "text-[var(--bad)]" };
  if (n <= 2) return { text: `残り ${n}`, tone: "text-[var(--warn)]" };
  return { text: `${n} 台`, tone: "text-[var(--accent)]" };
}

export default function Home() {
  const nearby = rankNearbyPorts(SEED_PORTS, DEMO_ORIGIN, { limit: 12 });

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-16 pt-8">
      <header className="mb-8">
        <p className="text-sm tracking-wide text-[var(--muted)]">
          最初期エリア: 福岡 · 仮名なし
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          シェアポートいま何台？
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
          チャリチャリ / LUUP / ラクすくの近くのポートと、貸出できそうかを一覧。
          いまは福岡デモシード（満空は本物じゃない）。あとから他都市へ広げる。
        </p>
      </header>

      <section className="mb-6 flex flex-wrap gap-2">
        {OPERATOR_ORDER.map((id) => (
          <span
            key={id}
            className="rounded-full border border-white/15 bg-[var(--bg-elevated)] px-3 py-1 text-sm"
          >
            {OPERATORS[id].name}
          </span>
        ))}
      </section>

      <p className="mb-3 text-xs text-[var(--muted)]">
        原点: 天神（デモ） · {nearby.length} 件
      </p>

      <ul className="flex flex-col gap-3">
        {nearby.map((port) => {
          const op = OPERATORS[port.operatorId];
          const avail = availabilityLabel(port.availability.vehiclesAvailable);
          const usable = isLikelyUsable(port);
          return (
            <li
              key={port.id}
              className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[var(--muted)]">
                    {op.name} · {port.areaLabel}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold leading-snug">
                    {port.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {formatDistance(port.distanceM)}
                    {usable ? " · 使えそう" : " · 空いてない / 不明"}
                  </p>
                </div>
                <div
                  className={`shrink-0 text-right text-sm font-bold ${avail.tone}`}
                >
                  {avail.text}
                </div>
              </div>
              <PortSignalActions port={port} />
            </li>
          );
        })}
      </ul>

      <footer className="mt-10 text-xs leading-relaxed text-[var(--muted)]">
        リポジトリ名:{" "}
        <code className="text-[var(--ink)]">fukuoka-share-ports</code>
        。プロダクト名は未定。満空はシードのみ。「乗るわ / 乗りたかった」は端末にだけ記録。
      </footer>
    </div>
  );
}
