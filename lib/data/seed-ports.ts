import type { SharePort } from "@/lib/domain/port";

/**
 * デモ用シード。実在ポートの正確な満空ではない。
 * 本番は事業者 API / 公式連携アダプタに差し替える。
 */
export const SEED_PORTS: SharePort[] = [
  {
    id: "cc-tenjin-1",
    operatorId: "charichari",
    name: "天神コア前（デモ）",
    lat: 33.5902,
    lng: 130.3987,
    areaLabel: "天神",
    availability: {
      vehiclesAvailable: 4,
      docksAvailable: 2,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
  {
    id: "cc-hakata-1",
    operatorId: "charichari",
    name: "博多駅筑紫口（デモ）",
    lat: 33.5904,
    lng: 130.4207,
    areaLabel: "博多",
    availability: {
      vehiclesAvailable: 0,
      docksAvailable: 6,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
  {
    id: "luup-ohori-1",
    operatorId: "luup",
    name: "大濠公園東（デモ）",
    lat: 33.5865,
    lng: 130.3795,
    areaLabel: "大濠",
    availability: {
      vehiclesAvailable: 2,
      docksAvailable: null,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
  {
    id: "luup-tenjin-1",
    operatorId: "luup",
    name: "天神地下街付近（デモ）",
    lat: 33.5898,
    lng: 130.3975,
    areaLabel: "天神",
    availability: {
      vehiclesAvailable: 1,
      docksAvailable: null,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
  {
    id: "rk-akasakamori-1",
    operatorId: "rakusuku",
    name: "赤坂門付近（デモ）",
    lat: 33.5859,
    lng: 130.3921,
    areaLabel: "赤坂",
    availability: {
      vehiclesAvailable: 3,
      docksAvailable: 1,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
  {
    id: "rk-yakuin-1",
    operatorId: "rakusuku",
    name: "薬院大通（デモ）",
    lat: 33.5816,
    lng: 130.4018,
    areaLabel: "薬院",
    availability: {
      vehiclesAvailable: null,
      docksAvailable: null,
      observedAt: "2026-07-22T07:00:00.000Z",
      source: "seed",
    },
  },
];
