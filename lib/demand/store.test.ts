import { describe, expect, it } from "vitest";
import { createUnmetDemandSignal } from "@/lib/domain/unmet-demand";
import { aggregateByAreaOperator, appendSignal, loadSignals } from "./store";

describe("unmet demand store", () => {
  it("appends newest first and caps length", () => {
    const base = createUnmetDemandSignal({
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
        createUnmetDemandSignal(
          {
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

  it("aggregates by area and operator", () => {
    const signals = [
      createUnmetDemandSignal({
        cityId: "fukuoka",
        portId: "a",
        operatorId: "luup",
        portName: "A",
        areaLabel: "天神",
        vehiclesAvailable: 0,
        intendedDestination: "博多駅",
      }),
      createUnmetDemandSignal({
        cityId: "fukuoka",
        portId: "b",
        operatorId: "luup",
        portName: "B",
        areaLabel: "天神",
        vehiclesAvailable: 0,
      }),
    ];
    const agg = aggregateByAreaOperator(signals);
    expect(agg[0]).toMatchObject({
      areaLabel: "天神",
      operatorId: "luup",
      count: 2,
      withDestination: 1,
    });
  });

  it("loadSignals tolerates bad JSON", () => {
    expect(loadSignals("nope")).toEqual([]);
  });
});
