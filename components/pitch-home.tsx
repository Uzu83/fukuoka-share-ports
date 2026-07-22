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

function availabilityMeta(n: number | null): {
  text: string;
  tone: "ok" | "low" | "bad" | "muted";
} {
  if (n === null) return { text: "不明", tone: "muted" };
  if (n <= 0) return { text: "貸出 0", tone: "bad" };
  if (n <= 2) return { text: `残り ${n}`, tone: "low" };
  return { text: `${n} 台`, tone: "ok" };
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

  const nearestId = nearby[0]?.id;

  function toggleOp(id: OperatorId) {
    setEnabledOps((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const originLabel =
    location.source === "gps"
      ? "いまの位置から近い順"
      : `天神デモから近い順（${DEMO_ORIGIN.lat.toFixed(3)}, ${DEMO_ORIGIN.lng.toFixed(3)}）`;

  return (
    <div className="shell">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:px-6 sm:pt-10">
        <header className="reveal flex flex-col gap-5">
          <p className="meta-line uppercase">福岡 · シェアポート横断</p>
          <div className="flex flex-col gap-3">
            <h1 className="brand-mark text-[2.35rem] font-bold leading-none tracking-tight text-[var(--ink)] sm:text-[2.6rem]">
              {PRODUCT_NAME}
            </h1>
            <p className="max-w-[22rem] text-[0.98rem] leading-relaxed text-[var(--muted)]">
              {PRODUCT_TAGLINE}
              <br />
              乗れる一台を見つけて、公式アプリへ。
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a className="btn-primary !w-auto px-5" href={feedbackMailto()}>
              フィードバック
            </a>
          </div>
        </header>

        <section
          className="reveal reveal-delay-1 notice px-4 py-3.5 text-[0.84rem] leading-relaxed text-[var(--muted)]"
          role="status"
          aria-label="デモについて"
        >
          <p className="font-medium text-[var(--warn)]">ピッチ用デモ</p>
          <p className="mt-1">
            ポート位置・満空はサンプルです。正確な空き・予約・解錠は各社公式アプリで確認してください。
          </p>
        </section>

        <section className="reveal reveal-delay-2 flex flex-col gap-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[1.05rem] font-bold tracking-tight text-[var(--ink)]">
                近くのポート
              </h2>
              <p className="mt-1 text-[0.8rem] text-[var(--faint)]">
                {originLabel}
                {location.error ? ` · ${location.error}` : ""}
              </p>
            </div>
            <span className="text-[0.78rem] tabular-nums text-[var(--faint)]">
              {nearby.length}
            </span>
          </div>

          <fieldset className="flex flex-wrap gap-2 border-0 p-0">
            <legend className="sr-only">事業者フィルタ</legend>
            {OPERATOR_ORDER.map((id) => {
              const on = enabledOps[id];
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleOp(id)}
                  className="filter-chip"
                  data-on={on ? "true" : "false"}
                >
                  {OPERATORS[id].name}
                </button>
              );
            })}
          </fieldset>

          {nearby.length === 0 ? (
            <p className="notice px-4 py-8 text-center text-sm text-[var(--faint)]">
              この条件のポートはありません。
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {nearby.map((port, index) => {
                const op = OPERATORS[port.operatorId];
                const avail = availabilityMeta(
                  port.availability.vehiclesAvailable,
                );
                const usable = isLikelyUsable(port);
                const isNearest = port.id === nearestId;

                return (
                  <li
                    key={port.id}
                    className={`port-card px-4 py-4 ${index < 3 ? `reveal reveal-delay-${index + 1}` : ""}`}
                    data-usable={usable ? "true" : "false"}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="meta-line uppercase">
                            {op.name}
                            {port.availability.source === "seed"
                              ? " · デモ"
                              : ""}
                          </p>
                          {isNearest ? (
                            <span className="rounded-full bg-[var(--accent-dim)] px-2 py-0.5 text-[0.68rem] font-medium text-[var(--accent)]">
                              最寄り
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-1.5 text-[1.1rem] font-bold leading-snug tracking-tight text-[var(--ink)]">
                          {port.name}
                        </h3>
                        <p className="mt-1 text-[0.82rem] text-[var(--faint)]">
                          {port.areaLabel} · {formatDistance(port.distanceM)}
                          {usable ? " · 使えそう" : " · 空いてない / 不明"}
                        </p>
                      </div>
                      <span
                        className="status-pill shrink-0 text-[0.78rem] font-semibold"
                        data-tone={avail.tone}
                      >
                        {avail.text}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      <OpenOperatorAppButton port={port} />
                      <PortSignalActions port={port} />
                      <FavoritePortControls port={port} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <footer className="border-t border-[var(--line)] pt-6 text-center text-[0.78rem] leading-relaxed text-[var(--faint)]">
          <p>
            端末内だけに保存: お気に入り・乗るわ / 乗りたかった。サーバ未送信。
            位置情報は近傍ソートのみに使い、保存しません。
          </p>
          <p className="mt-3">
            予約・決済・解錠は各公式アプリで完結します。
            <br />
            {PRODUCT_NAME} は横断ハブです。
          </p>
        </footer>
      </div>
    </div>
  );
}
