import type { OperatorId } from "@/lib/domain/operator";
import type { CityId } from "@/lib/domain/port";

/**
 * お気に入りポート。
 * notifyWhenUsable=true のとき「使えるヤツが来たら通知」（満空 live 連携後）。
 */
export type FavoritePort = {
  portId: string;
  cityId: CityId;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  notifyWhenUsable: boolean;
  createdAt: string;
};

export type FavoritePortInput = {
  portId: string;
  cityId: CityId;
  operatorId: OperatorId;
  portName: string;
  areaLabel: string;
  notifyWhenUsable?: boolean;
};

export function createFavorite(
  input: FavoritePortInput,
  opts?: { now?: Date },
): FavoritePort {
  return {
    portId: input.portId,
    cityId: input.cityId,
    operatorId: input.operatorId,
    portName: input.portName,
    areaLabel: input.areaLabel,
    notifyWhenUsable: input.notifyWhenUsable ?? true,
    createdAt: (opts?.now ?? new Date()).toISOString(),
  };
}
