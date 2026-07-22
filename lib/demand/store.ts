import type { PortSignal, PortSignalKind } from "@/lib/domain/port-signal";

export const PORT_SIGNAL_STORAGE_KEY = "fsp.port-signals.v2";
/** 旧キー。読み取り時に移行する。 */
export const LEGACY_UNMET_DEMAND_STORAGE_KEY = "fsp.unmet-demand.v1";

function normalizeSignal(raw: unknown): PortSignal | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.portId !== "string") return null;

  const kind: PortSignalKind =
    o.kind === "rode" || o.kind === "wanted" ? o.kind : "wanted";

  const destination =
    typeof o.destination === "string"
      ? o.destination
      : typeof o.intendedDestination === "string"
        ? o.intendedDestination
        : null;

  return {
    id: o.id,
    kind,
    createdAt:
      typeof o.createdAt === "string" ? o.createdAt : new Date(0).toISOString(),
    cityId: (o.cityId as PortSignal["cityId"]) ?? "fukuoka",
    portId: o.portId,
    operatorId: o.operatorId as PortSignal["operatorId"],
    portName: typeof o.portName === "string" ? o.portName : "",
    areaLabel: typeof o.areaLabel === "string" ? o.areaLabel : "",
    vehiclesAvailable:
      typeof o.vehiclesAvailable === "number" ? o.vehiclesAvailable : null,
    destination: destination && destination.length > 0 ? destination : null,
  };
}

export function loadSignals(raw: string | null): PortSignal[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeSignal)
      .filter((s): s is PortSignal => s !== null);
  } catch {
    return [];
  }
}

/** localStorage から v2 + 旧 v1 を読む。 */
export function readSignalsFromStorage(): PortSignal[] {
  if (typeof window === "undefined") return [];
  const v2 = loadSignals(window.localStorage.getItem(PORT_SIGNAL_STORAGE_KEY));
  if (v2.length > 0) return v2;
  return loadSignals(
    window.localStorage.getItem(LEGACY_UNMET_DEMAND_STORAGE_KEY),
  );
}

export function writeSignalsToStorage(signals: PortSignal[]): void {
  window.localStorage.setItem(PORT_SIGNAL_STORAGE_KEY, JSON.stringify(signals));
}

export function appendSignal(
  existing: PortSignal[],
  signal: PortSignal,
): PortSignal[] {
  return [signal, ...existing].slice(0, 200);
}

export type AreaOperatorAgg = {
  areaLabel: string;
  operatorId: string;
  wanted: number;
  rode: number;
  withDestination: number;
};

/** 事業者向けの粗い集計（個人特定しない）。 */
export function aggregateByAreaOperator(
  signals: PortSignal[],
): AreaOperatorAgg[] {
  const map = new Map<string, AreaOperatorAgg>();
  for (const s of signals) {
    const key = `${s.areaLabel}::${s.operatorId}`;
    const cur = map.get(key) ?? {
      areaLabel: s.areaLabel,
      operatorId: s.operatorId,
      wanted: 0,
      rode: 0,
      withDestination: 0,
    };
    if (s.kind === "wanted") cur.wanted += 1;
    else cur.rode += 1;
    if (s.destination) cur.withDestination += 1;
    map.set(key, cur);
  }
  return [...map.values()].sort(
    (a, b) => b.wanted + b.rode - (a.wanted + a.rode),
  );
}

/** @deprecated use PORT_SIGNAL_STORAGE_KEY */
export const UNMET_DEMAND_STORAGE_KEY = LEGACY_UNMET_DEMAND_STORAGE_KEY;
