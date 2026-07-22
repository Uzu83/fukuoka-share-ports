import type { OperatorId } from "./operator";

export type PortAvailability = {
  /** 貸出可能台数。不明なときは null。 */
  vehiclesAvailable: number | null;
  /** 返却空き（ドック型のみ）。不明・非対応は null。 */
  docksAvailable: number | null;
  /** データ取得時刻（ISO）。シードは仮。 */
  observedAt: string;
  /** live = 将来の API / seed = デモ用固定値 */
  source: "seed" | "live";
};

export type SharePort = {
  id: string;
  operatorId: OperatorId;
  name: string;
  lat: number;
  lng: number;
  /** ざっくりエリアラベル（天神・博多など）。 */
  areaLabel: string;
  availability: PortAvailability;
};

export function isLikelyUsable(port: SharePort): boolean {
  const n = port.availability.vehiclesAvailable;
  return n !== null && n > 0;
}
