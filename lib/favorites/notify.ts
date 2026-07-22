import type { FavoritePort } from "@/lib/domain/favorite-port";
import { isLikelyUsable, type SharePort } from "@/lib/domain/port";

/**
 * 前回スナップショット → 今回で、お気に入りかつ通知ONのポートが
 * 「使えなかった / 不明」から「使えそう」に変わったもの。
 *
 * 満空 live 連携後、ポーリング or push の判定に使う。
 */
export function favoritesBecomingUsable(
  previousVehicles: ReadonlyMap<string, number | null>,
  currentPorts: readonly SharePort[],
  favorites: readonly FavoritePort[],
): SharePort[] {
  const watch = new Map(
    favorites
      .filter((f) => f.notifyWhenUsable)
      .map((f) => [f.portId, f] as const),
  );
  if (watch.size === 0) return [];

  const became: SharePort[] = [];
  for (const port of currentPorts) {
    if (!watch.has(port.id)) continue;
    if (!isLikelyUsable(port)) continue;
    const prev = previousVehicles.get(port.id);
    const wasUsable = prev !== undefined && prev !== null && prev > 0;
    if (!wasUsable) became.push(port);
  }
  return became;
}

export function snapshotVehicles(
  ports: readonly SharePort[],
): Map<string, number | null> {
  return new Map(
    ports.map((p) => [p.id, p.availability.vehiclesAvailable] as const),
  );
}
