import { describe, expect, it } from "vitest";
import { buildOperatorLaunchUrl, getOperatorLaunch } from "./operator-launch";

describe("operator launch", () => {
  it("returns CTA per operator", () => {
    expect(getOperatorLaunch("luup").ctaLabel).toContain("LUUP");
    expect(getOperatorLaunch("charichari").primaryUrl).toMatch(/^https:/);
  });

  it("builds maps hint with coordinates", () => {
    const url = buildOperatorLaunchUrl({
      operatorId: "rakusuku",
      lat: 33.58,
      lng: 130.39,
      name: "demo",
    });
    expect(url.mapsHint).toContain("33.58");
    expect(url.mapsHint).toContain("130.39");
    expect(url.ctaLabel).toContain("ラクすく");
  });
});
