import type { OperatorId } from "./operator";
import type { CityId } from "./port";

/**
 * 「ここから乗りたかった」未充足需要シグナル。
 *
 * 利用者のチェック行動に、乗れなかった／乗りたかった意思を足す。
 * 事業者へは個人特定できないエリア×時間帯集計として渡す想定。
 */
export type UnmetDemandSignal = {
  id: string;
  createdAt: string;
  cityId: CityId;
  portId: string;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  /** 報告時点の貸出台数スナップショット（不明は null）。 */
  vehiclesAvailable: number | null;
  /** 任意: どこまで行きたかったか（自由記述）。 */
  intendedDestination: string | null;
};

export type UnmetDemandInput = {
  cityId: CityId;
  portId: string;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  vehiclesAvailable: number | null;
  intendedDestination?: string;
};

export function createUnmetDemandSignal(
  input: UnmetDemandInput,
  opts?: { id?: string; now?: Date },
): UnmetDemandSignal {
  const dest = input.intendedDestination?.trim() ?? "";
  return {
    id: opts?.id ?? crypto.randomUUID(),
    createdAt: (opts?.now ?? new Date()).toISOString(),
    cityId: input.cityId,
    portId: input.portId,
    operatorId: input.operatorId,
    portName: input.portName,
    areaLabel: input.areaLabel,
    vehiclesAvailable: input.vehiclesAvailable,
    intendedDestination: dest.length > 0 ? dest : null,
  };
}
