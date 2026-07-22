import type { UnmetDemandSignal } from "@/lib/domain/unmet-demand";

export const UNMET_DEMAND_STORAGE_KEY = "fsp.unmet-demand.v1";

export function loadSignals(raw: string | null): UnmetDemandSignal[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as UnmetDemandSignal[];
  } catch {
    return [];
  }
}

export function appendSignal(
  existing: UnmetDemandSignal[],
  signal: UnmetDemandSignal,
): UnmetDemandSignal[] {
  return [signal, ...existing].slice(0, 200);
}

/** 事業者向けの粗い集計（個人特定しない）。 */
export function aggregateByAreaOperator(signals: UnmetDemandSignal[]): {
  areaLabel: string;
  operatorId: string;
  count: number;
  withDestination: number;
}[] {
  const map = new Map<
    string,
    {
      areaLabel: string;
      operatorId: string;
      count: number;
      withDestination: number;
    }
  >();
  for (const s of signals) {
    const key = `${s.areaLabel}::${s.operatorId}`;
    const cur = map.get(key) ?? {
      areaLabel: s.areaLabel,
      operatorId: s.operatorId,
      count: 0,
      withDestination: 0,
    };
    cur.count += 1;
    if (s.intendedDestination) cur.withDestination += 1;
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}
