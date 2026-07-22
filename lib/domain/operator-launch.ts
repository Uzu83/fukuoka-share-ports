import type { OperatorId } from "./operator";
import type { SharePort } from "./port";

/**
 * 各社アプリ / Web への誘導先。
 *
 * 公式のポート単位ディープリンクが取れたら `portDeepLinkTemplate` を差し替える。
 * いまはアプリ起動（または公式サイト / ストア）までのベストエフォート。
 */
export type OperatorLaunch = {
  operatorId: OperatorId;
  /** ボタン文言。例: 「チャリチャリで乗る」 */
  ctaLabel: string;
  /** まず開く URL（公式サイト / Universal Link 候補）。 */
  primaryUrl: string;
  /** アプリ未導入時のストア。 */
  storeUrl: string;
};

const LAUNCH: Record<OperatorId, OperatorLaunch> = {
  charichari: {
    operatorId: "charichari",
    ctaLabel: "チャリチャリで乗る",
    primaryUrl: "https://charichari.bike/",
    storeUrl:
      "https://apps.apple.com/jp/app/%E3%83%81%E3%83%A3%E3%83%AA%E3%83%81%E3%83%A3%E3%83%AA-%E3%82%B7%E3%82%A7%E3%82%A2%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB/id1341611829",
  },
  luup: {
    operatorId: "luup",
    ctaLabel: "LUUPで乗る",
    primaryUrl: "https://luup.sc/",
    storeUrl: "https://apps.apple.com/jp/app/luup-ride-your-city/id1445630390",
  },
  rakusuku: {
    operatorId: "rakusuku",
    ctaLabel: "ラクすくで乗る",
    // 公式LP。アプリスキームが公開されたら差し替え。
    primaryUrl: "https://www.idss.co.jp/business/mobility/raksuku/",
    storeUrl:
      "https://apps.apple.com/jp/search?term=%E3%83%A9%E3%82%AF%E3%81%99%E3%81%8F",
  },
};

export function getOperatorLaunch(operatorId: OperatorId): OperatorLaunch {
  return LAUNCH[operatorId];
}

/**
 * ポート単位で開きたい URL。
 * 将来: 各社の portId / 地図 deep link をここに載せる。
 * 当面: 位置だけ Maps に載せつつ、primary は公式へ。
 */
export function buildOperatorLaunchUrl(
  port: Pick<SharePort, "operatorId" | "lat" | "lng" | "name">,
): { appOrWeb: string; mapsHint: string; storeUrl: string; ctaLabel: string } {
  const launch = getOperatorLaunch(port.operatorId);
  const mapsHint = `https://www.google.com/maps/search/?api=1&query=${port.lat}%2C${port.lng}`;
  return {
    appOrWeb: launch.primaryUrl,
    mapsHint,
    storeUrl: launch.storeUrl,
    ctaLabel: launch.ctaLabel,
  };
}
