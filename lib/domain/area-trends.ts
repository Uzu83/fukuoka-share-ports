import type { SharePort } from "@/lib/domain/port";
import { isLikelyUsable } from "@/lib/domain/port";
import type { PortSignal } from "@/lib/domain/port-signal";

export type AreaTrend = {
  areaLabel: string;
  /** 相対ヒート（高いほど「いま熱い」）。 */
  heat: number;
  usablePorts: number;
  signalCount: number;
  /** デモ向けの短いラベル。 */
  label: "活況" | "注目" | "動きあり";
};

/**
 * エリア横断の「いま熱い」ランキング。
 * live 連携前は満空シード + 端末内シグナルで近似する。
 *
 * heat = 乗れるポート数×3 + 貸出台数合計 + wanted×4 + rode×2
 */
export function rankAreaTrends(
  ports: SharePort[],
  signals: PortSignal[],
  opts?: { limit?: number },
): AreaTrend[] {
  const byArea = new Map<
    string,
    { usablePorts: number; vehicles: number; signalCount: number }
  >();

  for (const port of ports) {
    const cur = byArea.get(port.areaLabel) ?? {
      usablePorts: 0,
      vehicles: 0,
      signalCount: 0,
    };
    if (isLikelyUsable(port)) {
      cur.usablePorts += 1;
      cur.vehicles += port.availability.vehiclesAvailable ?? 0;
    }
    byArea.set(port.areaLabel, cur);
  }

  for (const signal of signals) {
    if (!signal.areaLabel) continue;
    const cur = byArea.get(signal.areaLabel) ?? {
      usablePorts: 0,
      vehicles: 0,
      signalCount: 0,
    };
    cur.signalCount += 1;
    byArea.set(signal.areaLabel, cur);
  }

  // wanted / rode の重み分け
  const wantedByArea = new Map<string, number>();
  const rodeByArea = new Map<string, number>();
  for (const signal of signals) {
    if (!signal.areaLabel) continue;
    if (signal.kind === "wanted") {
      wantedByArea.set(
        signal.areaLabel,
        (wantedByArea.get(signal.areaLabel) ?? 0) + 1,
      );
    } else {
      rodeByArea.set(
        signal.areaLabel,
        (rodeByArea.get(signal.areaLabel) ?? 0) + 1,
      );
    }
  }

  const ranked: AreaTrend[] = [...byArea.entries()].map(
    ([areaLabel, stats]) => {
      const wanted = wantedByArea.get(areaLabel) ?? 0;
      const rode = rodeByArea.get(areaLabel) ?? 0;
      const heat =
        stats.usablePorts * 3 + stats.vehicles + wanted * 4 + rode * 2;
      return {
        areaLabel,
        heat,
        usablePorts: stats.usablePorts,
        signalCount: stats.signalCount,
        label: trendLabel(heat, stats.signalCount),
      };
    },
  );

  ranked.sort((a, b) => {
    if (b.heat !== a.heat) return b.heat - a.heat;
    return a.areaLabel.localeCompare(b.areaLabel, "ja");
  });

  const limit = opts?.limit ?? ranked.length;
  return ranked.filter((t) => t.heat > 0).slice(0, limit);
}

function trendLabel(heat: number, signalCount: number): AreaTrend["label"] {
  if (signalCount >= 2 || heat >= 12) return "活況";
  if (heat >= 6) return "注目";
  return "動きあり";
}
