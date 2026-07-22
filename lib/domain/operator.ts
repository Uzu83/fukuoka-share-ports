/** 福岡市で扱うシェアモビリティ事業者（仮）。 */
export type OperatorId = "charichari" | "luup" | "rakusuku";

export type Operator = {
  id: OperatorId;
  name: string;
};

export const OPERATORS: Record<OperatorId, Operator> = {
  charichari: {
    id: "charichari",
    name: "チャリチャリ",
  },
  luup: {
    id: "luup",
    name: "LUUP",
  },
  rakusuku: {
    id: "rakusuku",
    name: "ラクすく",
  },
};
