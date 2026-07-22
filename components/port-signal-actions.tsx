"use client";

import { useState } from "react";
import {
  appendSignal,
  readSignalsFromStorage,
  writeSignalsToStorage,
} from "@/lib/demand/store";
import type { SharePort } from "@/lib/domain/port";
import {
  createPortSignal,
  type PortSignalKind,
} from "@/lib/domain/port-signal";

type Props = {
  port: Pick<
    SharePort,
    "id" | "cityId" | "operatorId" | "name" | "areaLabel" | "availability"
  >;
};

type Draft = {
  kind: PortSignalKind;
} | null;

export function PortSignalActions({ port }: Props) {
  const [draft, setDraft] = useState<Draft>(null);
  const [destination, setDestination] = useState("");
  const [done, setDone] = useState<Partial<Record<PortSignalKind, boolean>>>(
    {},
  );

  function persist(kind: PortSignalKind) {
    const signal = createPortSignal({
      kind,
      cityId: port.cityId,
      portId: port.id,
      operatorId: port.operatorId,
      portName: port.name,
      areaLabel: port.areaLabel,
      vehiclesAvailable: port.availability.vehiclesAvailable,
      destination,
    });
    const next = appendSignal(readSignalsFromStorage(), signal);
    writeSignalsToStorage(next);
    setDone((d) => ({ ...d, [kind]: true }));
    setDraft(null);
    setDestination("");
  }

  if (draft) {
    const isWanted = draft.kind === "wanted";
    return (
      <div className="mt-3 rounded-xl border border-white/15 bg-black/25 p-3">
        <p className="text-sm font-medium">
          {isWanted ? "乗りたかった意思を送る" : "乗る意思を送る"}
        </p>
        <label className="mt-2 block text-xs text-[var(--muted)]">
          {isWanted
            ? "どこまで行きたかった？（任意）"
            : "どこまで行く？（任意）"}
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="例: 博多駅 / 会社"
            className="mt-1 w-full rounded-lg border border-white/10 bg-[var(--bg)] px-3 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/50"
          />
        </label>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => persist(draft.kind)}
            className="flex-1 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-bold text-[#0b1f19]"
          >
            送る
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(null);
              setDestination("");
            }}
            className="rounded-lg px-3 py-2 text-sm text-[var(--muted)]"
          >
            やめる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      {done.rode ? (
        <p className="text-xs text-[var(--accent)]">
          乗るわ、記録した。いいね。
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setDraft({ kind: "rode" })}
          className="w-full rounded-xl border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-3 py-2 text-left text-sm font-medium text-[var(--ink)] hover:bg-[var(--accent)]/20"
        >
          これ乗るわ😎
        </button>
      )}
      {done.wanted ? (
        <p className="text-xs text-[var(--muted)]">
          乗りたかった、記録したよ。
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setDraft({ kind: "wanted" })}
          className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-left text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]/40"
        >
          ここから乗りたかった😭
        </button>
      )}
    </div>
  );
}
