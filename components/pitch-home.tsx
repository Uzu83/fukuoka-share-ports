"use client";

import { useMemo, useState } from "react";
import { FavoritePortControls } from "@/components/favorite-port-controls";
import { OpenOperatorAppButton } from "@/components/open-operator-app-button";
import { PortSignalActions } from "@/components/port-signal-actions";
import { SEED_PORTS } from "@/lib/data/seed-ports";
import { OPERATORS, type OperatorId } from "@/lib/domain/operator";
import { isLikelyUsable } from "@/lib/domain/port";
import { DEMO_ORIGIN, useUserLocation } from "@/lib/geo/use-user-location";
import { rankNearbyPorts } from "@/lib/ports/nearby";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/product";

const OPERATOR_ORDER: OperatorId[] = ["charichari", "luup", "rakusuku"];

const FEEDBACK_MAIL = "2201100431bg@cyber-u.ac.jp";

function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function availabilityLabel(n: number | null): { text: string; tone: string } {
  if (n === null) return { text: "不明", tone: "text-[var(--muted)]" };
  if (n <= 0) return { text: "貸出 0", tone: "text-[var(--bad)]" };
  if (n <= 2) return { text: `残り ${n}`, tone: "text-[var(--warn)]" };
  return { text: `${n} 台`, tone: "text-[var(--accent)]" };
}

function feedbackMailto(): string {
  const subject = encodeURIComponent(`${PRODUCT_NAME} フィードバック`);
  const body = encodeURIComponent(
    "デバイス / OS:\n良かった点:\n困った点:\nまた使いたい？ (Y/N):\n",
  );
  return `mailto:${FEEDBACK_MAIL}?subject=${subject}&body=${body}`;
}

export function PitchHome() {
  const location = useUserLocation();
  const [enabledOps, setEnabledOps] = useState<Record<OperatorId, boolean>>({
    charichari: true,
    luup: true,
    rakusuku: true,
  });

  const activeOps = useMemo(
    () => OPERATOR_ORDER.filter((id) => enabledOps[id]),
    [enabledOps],
  );

  const nearby = useMemo(
    () =>
      rankNearbyPorts(
        SEED_PORTS,
        { lat: location.lat, lng: location.lng },
        {
          operatorIds: activeOps.length > 0 ? activeOps : OPERATOR_ORDER,
          limit: 12,
        },
      ),
    [location.lat, location.lng, activeOps],
  );

  function toggleOp(id: OperatorId) {
    setEnabledOps((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-16 pt-6">
      <div
        className="demo-banner mb-5 rounded-2xl border border-[var(--warn)]/35 bg-[var(--warn)]/10 px-3.5 py-3 text-sm leading-relaxed text-[var(--ink)]"
        role="status"
      >
        <p className="font-bold text-[var(--warn)]">ピッチ用デモ</p>
        <p className="mt-1 text-[var(--muted)]">
          ポート位置・満空は
          <strong className="text-[var(--ink)]">サンプル</strong>
          です。正確な空き・予約・解錠は各社公式アプリで確認してください。
        </p>
      </div>

      <header className="mb-6">
        <p className="text-sm tracking-wide text-[var(--muted)]">
          最初期エリア: 福岡 · 仮称
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {PRODUCT_NAME}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
          {PRODUCT_TAGLINE}
          <br />
          チャリチャリ / LUUP /
          ラクすくを横断。乗れる一台を見つけて、公式アプリへ。
        </p>
      </header>

      <section
        className="mb-4 flex flex-wrap gap-2"
        aria-label="事業者フィルタ"
      >
        {OPERATOR_ORDER.map((id) => {
          const on = enabledOps[id];
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => toggleOp(id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                on
                  ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--ink)]"
                  : "border-white/10 text-[var(--muted)] opacity-60"
              }`}
            >
              {OPERATORS[id].name}
            </button>
          );
        })}
      </section>

      <p className="mb-3 text-xs text-[var(--muted)]">
        原点:{" "}
        {location.source === "gps"
          ? "いまの位置（GPS）"
          : `天神デモ（${DEMO_ORIGIN.lat.toFixed(3)}, ${DEMO_ORIGIN.lng.toFixed(3)}）`}
        {location.error ? ` · ${location.error}` : ""} · {nearby.length} 件
      </p>

      <ul className="flex flex-col gap-3">
        {nearby.map((port) => {
          const op = OPERATORS[port.operatorId];
          const avail = availabilityLabel(port.availability.vehiclesAvailable);
          const usable = isLikelyUsable(port);
          return (
            <li
              key={port.id}
              className="port-card rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[var(--muted)]">
                    {op.name} · {port.areaLabel}
                    {port.availability.source === "seed" ? " · デモ" : ""}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold leading-snug">
                    {port.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {formatDistance(port.distanceM)}
                    {usable ? " · 使えそう" : " · 空いてない / 不明"}
                  </p>
                </div>
                <div
                  className={`shrink-0 text-right text-sm font-bold ${avail.tone}`}
                >
                  {avail.text}
                </div>
              </div>
              <FavoritePortControls port={port} />
              <OpenOperatorAppButton port={port} />
              <PortSignalActions port={port} />
            </li>
          );
        })}
      </ul>

      <footer className="mt-10 space-y-3 text-xs leading-relaxed text-[var(--muted)]">
        <p>
          端末内だけに保存: お気に入り・乗るわ / 乗りたかった。サーバ未送信。
          位置情報は近傍ソートのみに使い、保存しません。
        </p>
        <p>
          <a
            href={feedbackMailto()}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            フィードバックを送る
          </a>
        </p>
        <p>
          リポジトリ:{" "}
          <code className="text-[var(--ink)]">fukuoka-share-ports</code>
        </p>
      </footer>
    </div>
  );
}
