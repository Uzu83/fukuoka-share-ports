import { describe, expect, it } from "vitest";
import { createPortSignal } from "@/lib/domain/port-signal";
import { aggregateByAreaOperator, appendSignal, loadSignals } from "./store";

describe("port signal store", () => {
  it("appends newest first and caps length", () => {
    const base = createPortSignal({
      kind: "wanted",
      cityId: "fukuoka",
      portId: "p1",
      operatorId: "luup",
      portName: "A",
      areaLabel: "天神",
      vehiclesAvailable: 0,
    });
    let list = [base];
    for (let i = 0; i < 210; i++) {
      list = appendSignal(
        list,
        createPortSignal(
          {
            kind: "rode",
            cityId: "fukuoka",
            portId: `p${i}`,
            operatorId: "charichari",
            portName: "B",
            areaLabel: "博多",
            vehiclesAvailable: null,
          },
          { id: `id-${i}` },
        ),
      );
    }
    expect(list).toHaveLength(200);
    expect(list[0]?.id).toBe("id-209");
  });

  it("aggregates wanted vs rode", () => {
    const signals = [
      createPortSignal({
        kind: "wanted",
        cityId: "fukuoka",
        portId: "a",
        operatorId: "luup",
        portName: "A",
        areaLabel: "天神",
        vehiclesAvailable: 0,
        destination: "博多駅",
      }),
      createPortSignal({
        kind: "rode",
        cityId: "fukuoka",
        portId: "b",
        operatorId: "luup",
        portName: "B",
        areaLabel: "天神",
        vehiclesAvailable: 2,
      }),
    ];
    const agg = aggregateByAreaOperator(signals);
    expect(agg[0]).toMatchObject({
      areaLabel: "天神",
      operatorId: "luup",
      wanted: 1,
      rode: 1,
      withDestination: 1,
    });
  });

  it("migrates legacy intendedDestination without kind", () => {
    const legacy = JSON.stringify([
      {
        id: "old",
        createdAt: "2026-07-22T00:00:00.000Z",
        cityId: "fukuoka",
        portId: "p",
        operatorId: "rakusuku",
        portName: "X",
        areaLabel: "赤坂",
        vehiclesAvailable: 0,
        intendedDestination: "天神",
      },
    ]);
    const signals = loadSignals(legacy);
    expect(signals[0]).toMatchObject({
      kind: "wanted",
      destination: "天神",
    });
  });

  it("loadSignals tolerates bad JSON", () => {
    expect(loadSignals("nope")).toEqual([]);
  });
});
