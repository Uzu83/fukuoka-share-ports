"use client";

import { useState } from "react";
import {
  appendSignal,
  loadSignals,
  UNMET_DEMAND_STORAGE_KEY,
} from "@/lib/demand/store";
import type { SharePort } from "@/lib/domain/port";
import { createUnmetDemandSignal } from "@/lib/domain/unmet-demand";

type Props = {
  port: Pick<
    SharePort,
    "id" | "cityId" | "operatorId" | "name" | "areaLabel" | "availability"
  >;
};

export function WantedRideButton({ port }: Props) {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [done, setDone] = useState(false);

  function persist() {
    const signal = createUnmetDemandSignal({
      cityId: port.cityId,
      portId: port.id,
      operatorId: port.operatorId,
      portName: port.name,
      areaLabel: port.areaLabel,
      vehiclesAvailable: port.availability.vehiclesAvailable,
      intendedDestination: destination,
    });
    const existing = loadSignals(
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(UNMET_DEMAND_STORAGE_KEY),
    );
    const next = appendSignal(existing, signal);
    window.localStorage.setItem(UNMET_DEMAND_STORAGE_KEY, JSON.stringify(next));
    setDone(true);
    setOpen(false);
    setDestination("");
  }

  if (done) {
    return (
      <p className="mt-3 text-xs text-[var(--accent)]">
        記録したよ。街の改善ヒントになる。
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-left text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]/40"
      >
        ここから乗りたかった😭
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-white/15 bg-black/25 p-3">
      <p className="text-sm font-medium">乗りたかった意思を送る</p>
      <label className="mt-2 block text-xs text-[var(--muted)]">
        どこまで行きたかった？（任意）
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
          onClick={persist}
          className="flex-1 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-bold text-[#0b1f19]"
        >
          送る
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
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
