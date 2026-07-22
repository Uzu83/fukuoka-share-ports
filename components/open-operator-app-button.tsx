"use client";

import { buildOperatorLaunchUrl } from "@/lib/domain/operator-launch";
import type { SharePort } from "@/lib/domain/port";
import { isLikelyUsable } from "@/lib/domain/port";

type Props = {
  port: Pick<
    SharePort,
    "id" | "operatorId" | "name" | "lat" | "lng" | "availability"
  >;
};

/**
 * 貸出できそうなポートから各社アプリ（または公式Web / ストア）へ。
 * ポートピン留めの公式 deep link は連携後に差し替え。
 */
export function OpenOperatorAppButton({ port }: Props) {
  const usable = isLikelyUsable(port);
  const launch = buildOperatorLaunchUrl(port);

  if (!usable) {
    return (
      <a
        href={launch.appOrWeb}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block w-full rounded-xl border border-white/10 px-3 py-2 text-center text-sm text-[var(--muted)] hover:border-white/25"
      >
        {launch.ctaLabel.replace("で乗る", "アプリを開く")}
      </a>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      <a
        href={launch.appOrWeb}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl bg-[var(--ink)] px-3 py-2.5 text-center text-sm font-bold text-[var(--bg)] hover:opacity-90"
      >
        {launch.ctaLabel}
      </a>
      <div className="flex gap-2 text-xs">
        <a
          href={launch.mapsHint}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border border-white/10 px-2 py-1.5 text-center text-[var(--muted)] hover:border-white/25"
        >
          地図で場所
        </a>
        <a
          href={launch.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border border-white/10 px-2 py-1.5 text-center text-[var(--muted)] hover:border-white/25"
        >
          アプリを入れる
        </a>
      </div>
    </div>
  );
}
