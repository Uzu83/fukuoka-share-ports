import { describe, expect, it } from "vitest";
import { rankAreaTrends } from "@/lib/domain/area-trends";
import type { SharePort } from "@/lib/domain/port";
import type { PortSignal } from "@/lib/domain/port-signal";

function port(
  partial: Pick<SharePort, "id" | "areaLabel" | "availability">,
): SharePort {
  return {
    cityId: "fukuoka",
    operatorId: "charichari",
    name: partial.id,
    lat: 0,
    lng: 0,
    ...partial,
  };
}

function signal(partial: Pick<PortSignal, "areaLabel" | "kind">): PortSignal {
  return {
    id: crypto.randomUUID(),
    createdAt: "2026-07-22T00:00:00.000Z",
    cityId: "fukuoka",
    portId: "p1",
    operatorId: "charichari",
    portName: "demo",
    vehiclesAvailable: 0,
    destination: null,
    ...partial,
  };
}

describe("rankAreaTrends", () => {
  it("ranks areas with more usable vehicles higher", () => {
    const ports = [
      port({
        id: "a",
        areaLabel: "天神",
        availability: {
          vehiclesAvailable: 4,
          docksAvailable: null,
          observedAt: "2026-07-22T00:00:00.000Z",
          source: "seed",
        },
      }),
      port({
        id: "b",
        areaLabel: "博多",
        availability: {
          vehiclesAvailable: 0,
          docksAvailable: null,
          observedAt: "2026-07-22T00:00:00.000Z",
          source: "seed",
        },
      }),
    ];

    const ranked = rankAreaTrends(ports, []);
    expect(ranked[0]?.areaLabel).toBe("天神");
    expect(ranked.some((t) => t.areaLabel === "博多")).toBe(false);
  });

  it("boosts areas with wanted signals", () => {
    const ports = [
      port({
        id: "a",
        areaLabel: "天神",
        availability: {
          vehiclesAvailable: 1,
          docksAvailable: null,
          observedAt: "2026-07-22T00:00:00.000Z",
          source: "seed",
        },
      }),
      port({
        id: "b",
        areaLabel: "薬院",
        availability: {
          vehiclesAvailable: 1,
          docksAvailable: null,
          observedAt: "2026-07-22T00:00:00.000Z",
          source: "seed",
        },
      }),
    ];
    const signals = [
      signal({ areaLabel: "薬院", kind: "wanted" }),
      signal({ areaLabel: "薬院", kind: "wanted" }),
    ];

    const ranked = rankAreaTrends(ports, signals);
    expect(ranked[0]?.areaLabel).toBe("薬院");
    expect(ranked[0]?.label).toBe("活況");
  });
});
