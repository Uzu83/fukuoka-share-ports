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
      <div className="notice px-3.5 py-3">
        <p className="text-sm font-medium text-[var(--ink)]">
          {isWanted ? "乗りたかった意思を送る" : "乗る意思を送る"}
        </p>
        <label className="mt-2 block text-xs text-[var(--faint)]">
          {isWanted
            ? "どこまで行きたかった？（任意）"
            : "どこまで行く？（任意）"}
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="例: 博多駅 / 会社"
            className="mt-1.5 w-full rounded-[var(--radius-control)] border border-[var(--line-strong)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--faint)] focus:border-[var(--accent)]/45"
          />
        </label>
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={() => persist(draft.kind)}
            className="btn-primary !w-auto flex-1 !py-2 text-sm"
          >
            送る
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(null);
              setDestination("");
            }}
            className="rounded-[var(--radius-control)] px-3 py-2 text-sm text-[var(--muted)]"
          >
            やめる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {done.rode ? (
        <p className="text-xs text-[var(--accent)]">
          乗るわ、記録した。いいね。
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setDraft({ kind: "rode" })}
          className="btn-ghost w-full text-left text-sm font-medium"
        >
          これ乗るわ😎
        </button>
      )}
      {done.wanted ? (
        <p className="text-xs text-[var(--faint)]">
          乗りたかった、記録したよ。
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setDraft({ kind: "wanted" })}
          className="btn-ghost w-full text-left text-sm font-medium text-[var(--muted)]"
        >
          ここから乗りたかった😭
        </button>
      )}
    </div>
  );
}
