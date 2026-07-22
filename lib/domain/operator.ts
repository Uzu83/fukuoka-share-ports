/** 福岡市で扱うシェアモビリティ事業者（仮）。 */
export type OperatorId = "charichari" | "luup" | "rakusuku";

export type Operator = {
  id: OperatorId;
  name: string;
  /** 公式アプリへの誘導（ディープリンクは後で差し替え）。 */
  appStoreHint: string;
};

export const OPERATORS: Record<OperatorId, Operator> = {
  charichari: {
    id: "charichari",
    name: "チャリチャリ",
    appStoreHint: "ChariChari",
  },
  luup: {
    id: "luup",
    name: "LUUP",
    appStoreHint: "LUUP",
  },
  rakusuku: {
    id: "rakusuku",
    name: "ラクすく",
    appStoreHint: "ラクすく",
  },
};
