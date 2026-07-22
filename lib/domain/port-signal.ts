import type { OperatorId } from "./operator";
import type { CityId } from "./port";

/**
 * ポートに対する利用者シグナル。
 *
 * - wanted: 「ここから乗りたかった」（未充足）
 * - rode: 「これ乗るわ」（乗車意思 / 成功）
 *
 * 事業者へは個人特定できないエリア×時間帯集計として渡す想定。
 */
export type PortSignalKind = "wanted" | "rode";

export type PortSignal = {
  id: string;
  kind: PortSignalKind;
  createdAt: string;
  cityId: CityId;
  portId: string;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  /** 報告時点の貸出台数スナップショット（不明は null）。 */
  vehiclesAvailable: number | null;
  /** 任意: 行きたかった / 行った先（自由記述）。 */
  destination: string | null;
};

export type PortSignalInput = {
  kind: PortSignalKind;
  cityId: CityId;
  portId: string;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  vehiclesAvailable: number | null;
  destination?: string;
};

export function createPortSignal(
  input: PortSignalInput,
  opts?: { id?: string; now?: Date },
): PortSignal {
  const dest = input.destination?.trim() ?? "";
  return {
    id: opts?.id ?? crypto.randomUUID(),
    kind: input.kind,
    createdAt: (opts?.now ?? new Date()).toISOString(),
    cityId: input.cityId,
    portId: input.portId,
    operatorId: input.operatorId,
    portName: input.portName,
    areaLabel: input.areaLabel,
    vehiclesAvailable: input.vehiclesAvailable,
    destination: dest.length > 0 ? dest : null,
  };
}

/** @deprecated use PortSignal / createPortSignal */
export type UnmetDemandSignal = PortSignal;
/** @deprecated use PortSignalInput */
export type UnmetDemandInput = Omit<PortSignalInput, "kind"> & {
  intendedDestination?: string;
};

/** @deprecated use createPortSignal({ kind: "wanted", ... }) */
export function createUnmetDemandSignal(
  input: UnmetDemandInput,
  opts?: { id?: string; now?: Date },
): PortSignal {
  return createPortSignal(
    {
      kind: "wanted",
      cityId: input.cityId,
      portId: input.portId,
      operatorId: input.operatorId,
      portName: input.portName,
      areaLabel: input.areaLabel,
      vehiclesAvailable: input.vehiclesAvailable,
      destination: input.intendedDestination,
    },
    opts,
  );
}
