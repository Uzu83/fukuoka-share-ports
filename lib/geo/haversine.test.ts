import { describe, expect, it } from "vitest";
import { distanceMeters } from "./haversine";

describe("distanceMeters", () => {
  it("returns ~0 for identical points", () => {
    expect(
      distanceMeters({ lat: 33.59, lng: 130.4 }, { lat: 33.59, lng: 130.4 }),
    ).toBeLessThan(1);
  });

  it("puts Tenjin–Hakata roughly 1.5–2.5 km apart", () => {
    const m = distanceMeters(
      { lat: 33.5902, lng: 130.3987 },
      { lat: 33.5904, lng: 130.4207 },
    );
    expect(m).toBeGreaterThan(1500);
    expect(m).toBeLessThan(2500);
  });
});
