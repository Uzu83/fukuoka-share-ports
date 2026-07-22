import { describe, expect, it } from "vitest";
import { SEED_PORTS } from "@/lib/data/seed-ports";
import { rankNearbyPorts } from "./nearby";

describe("rankNearbyPorts", () => {
  it("sorts by distance from Tenjin", () => {
    const ranked = rankNearbyPorts(SEED_PORTS, {
      lat: 33.5902,
      lng: 130.3987,
    });
    expect(ranked[0]?.areaLabel).toBe("天神");
    expect(ranked[0]?.distanceM).toBeLessThan(ranked[1]?.distanceM ?? 1e9);
  });

  it("filters by operator", () => {
    const ranked = rankNearbyPorts(
      SEED_PORTS,
      { lat: 33.59, lng: 130.4 },
      { operatorIds: ["luup"] },
    );
    expect(ranked.every((p) => p.operatorId === "luup")).toBe(true);
  });
});
