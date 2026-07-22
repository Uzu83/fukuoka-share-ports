"use client";

import { useEffect, useState } from "react";
import type { FavoritePort } from "@/lib/domain/favorite-port";
import type { SharePort } from "@/lib/domain/port";
import {
  isFavorite,
  readFavoritesFromStorage,
  removeFavorite,
  setNotifyWhenUsable,
  upsertFavorite,
  writeFavoritesToStorage,
} from "@/lib/favorites/store";

type Props = {
  port: Pick<SharePort, "id" | "cityId" | "operatorId" | "name" | "areaLabel">;
};

export function FavoritePortControls({ port }: Props) {
  const [favorites, setFavorites] = useState<FavoritePort[]>([]);

  useEffect(() => {
    setFavorites(readFavoritesFromStorage());
  }, []);

  const fav = favorites.find((f) => f.portId === port.id);
  const saved = isFavorite(favorites, port.id);

  function persist(next: FavoritePort[]) {
    writeFavoritesToStorage(next);
    setFavorites(next);
  }

  function toggleFavorite() {
    if (saved) {
      persist(removeFavorite(favorites, port.id));
      return;
    }
    persist(
      upsertFavorite(favorites, {
        portId: port.id,
        cityId: port.cityId,
        operatorId: port.operatorId,
        portName: port.name,
        areaLabel: port.areaLabel,
        notifyWhenUsable: true,
      }),
    );
  }

  function toggleNotify() {
    if (!fav) return;
    persist(setNotifyWhenUsable(favorites, port.id, !fav.notifyWhenUsable));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={toggleFavorite}
        className="btn-quiet"
        data-on={saved ? "true" : "false"}
      >
        {saved ? "お気に入り中" : "お気に入り"}
      </button>
      {saved ? (
        <button
          type="button"
          onClick={toggleNotify}
          className="btn-quiet"
          data-on={fav?.notifyWhenUsable ? "true" : "false"}
          data-tone={fav?.notifyWhenUsable ? "warn" : undefined}
          title="満空の live 連携後に配信。いまは設定だけ保存"
        >
          {fav?.notifyWhenUsable ? "使えるヤツ来たら通知 ON" : "通知 OFF"}
        </button>
      ) : null}
    </div>
  );
}
