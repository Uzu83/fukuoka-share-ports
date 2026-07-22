"use client";

import { useEffect, useState } from "react";

export type UserLocation = {
  lat: number;
  lng: number;
  source: "gps" | "demo";
  error?: string;
};

/** デモ原点: 天神交差点付近。GPS 拒否時のフォールバック。 */
export const DEMO_ORIGIN = { lat: 33.5902, lng: 130.3987 };

export function useUserLocation(): UserLocation {
  const [loc, setLoc] = useState<UserLocation>({
    ...DEMO_ORIGIN,
    source: "demo",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoc({
        ...DEMO_ORIGIN,
        source: "demo",
        error: "この端末では位置情報が使えません",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoc({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          source: "gps",
        });
      },
      (err) => {
        setLoc({
          ...DEMO_ORIGIN,
          source: "demo",
          error: err.message || "位置情報を取得できませんでした",
        });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );
  }, []);

  return loc;
}
