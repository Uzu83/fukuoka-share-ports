import type { OperatorId } from "@/lib/domain/operator";
import type { SharePort } from "@/lib/domain/port";
import { distanceMeters } from "@/lib/geo/haversine";

export type NearbyPort = SharePort & { distanceM: number };

export function rankNearbyPorts(
  ports: SharePort[],
  origin: { lat: number; lng: number },
  opts?: { operatorIds?: OperatorId[]; limit?: number },
): NearbyPort[] {
  const allow = opts?.operatorIds ? new Set(opts.operatorIds) : null;
  const ranked = ports
    .filter((p) => (allow ? allow.has(p.operatorId) : true))
    .map((p) => ({
      ...p,
      distanceM: distanceMeters(origin, { lat: p.lat, lng: p.lng }),
    }))
    .sort((a, b) => a.distanceM - b.distanceM);
  const limit = opts?.limit ?? ranked.length;
  return ranked.slice(0, limit);
}
