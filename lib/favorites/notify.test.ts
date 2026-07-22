import { describe, expect, it } from "vitest";
import { createFavorite } from "@/lib/domain/favorite-port";
import type { SharePort } from "@/lib/domain/port";
import { favoritesBecomingUsable, snapshotVehicles } from "./notify";
import {
  isFavorite,
  loadFavorites,
  removeFavorite,
  setNotifyWhenUsable,
  upsertFavorite,
} from "./store";

const basePort = (id: string, vehicles: number | null): SharePort => ({
  id,
  cityId: "fukuoka",
  operatorId: "luup",
  name: id,
  lat: 33.59,
  lng: 130.4,
  areaLabel: "天神",
  availability: {
    vehiclesAvailable: vehicles,
    docksAvailable: null,
    observedAt: "2026-07-22T00:00:00.000Z",
    source: "seed",
  },
});

describe("favorites store", () => {
  it("upserts and removes", () => {
    let list = upsertFavorite([], {
      portId: "p1",
      cityId: "fukuoka",
      operatorId: "luup",
      portName: "A",
      areaLabel: "天神",
    });
    expect(isFavorite(list, "p1")).toBe(true);
    list = setNotifyWhenUsable(list, "p1", false);
    expect(list[0]?.notifyWhenUsable).toBe(false);
    list = removeFavorite(list, "p1");
    expect(isFavorite(list, "p1")).toBe(false);
  });

  it("loadFavorites tolerates bad JSON", () => {
    expect(loadFavorites("x")).toEqual([]);
  });
});

describe("favoritesBecomingUsable", () => {
  it("fires when favorite goes from 0 to available", () => {
    const fav = createFavorite({
      portId: "p1",
      cityId: "fukuoka",
      operatorId: "luup",
      portName: "A",
      areaLabel: "天神",
      notifyWhenUsable: true,
    });
    const prev = snapshotVehicles([basePort("p1", 0)]);
    const became = favoritesBecomingUsable(prev, [basePort("p1", 2)], [fav]);
    expect(became.map((p) => p.id)).toEqual(["p1"]);
  });

  it("does not fire when notify is off or already usable", () => {
    const favOff = createFavorite({
      portId: "p1",
      cityId: "fukuoka",
      operatorId: "luup",
      portName: "A",
      areaLabel: "天神",
      notifyWhenUsable: false,
    });
    const prev = snapshotVehicles([basePort("p1", 0)]);
    expect(
      favoritesBecomingUsable(prev, [basePort("p1", 2)], [favOff]),
    ).toHaveLength(0);

    const favOn = createFavorite({
      portId: "p2",
      cityId: "fukuoka",
      operatorId: "luup",
      portName: "B",
      areaLabel: "天神",
      notifyWhenUsable: true,
    });
    const prevUsable = snapshotVehicles([basePort("p2", 3)]);
    expect(
      favoritesBecomingUsable(prevUsable, [basePort("p2", 4)], [favOn]),
    ).toHaveLength(0);
  });
});
