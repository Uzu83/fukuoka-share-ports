import {
  createFavorite,
  type FavoritePort,
  type FavoritePortInput,
} from "@/lib/domain/favorite-port";

export const FAVORITES_STORAGE_KEY = "fsp.favorites.v1";

export function loadFavorites(raw: string | null): FavoritePort[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (f): f is FavoritePort =>
        !!f &&
        typeof f === "object" &&
        typeof (f as FavoritePort).portId === "string",
    );
  } catch {
    return [];
  }
}

export function readFavoritesFromStorage(): FavoritePort[] {
  if (typeof window === "undefined") return [];
  return loadFavorites(window.localStorage.getItem(FAVORITES_STORAGE_KEY));
}

export function writeFavoritesToStorage(favorites: FavoritePort[]): void {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function upsertFavorite(
  existing: FavoritePort[],
  input: FavoritePortInput,
): FavoritePort[] {
  const next = existing.filter((f) => f.portId !== input.portId);
  return [createFavorite(input), ...next];
}

export function removeFavorite(
  existing: FavoritePort[],
  portId: string,
): FavoritePort[] {
  return existing.filter((f) => f.portId !== portId);
}

export function setNotifyWhenUsable(
  existing: FavoritePort[],
  portId: string,
  notifyWhenUsable: boolean,
): FavoritePort[] {
  return existing.map((f) =>
    f.portId === portId ? { ...f, notifyWhenUsable } : f,
  );
}

export function isFavorite(favorites: FavoritePort[], portId: string): boolean {
  return favorites.some((f) => f.portId === portId);
}
