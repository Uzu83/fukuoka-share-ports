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
        className="btn-ghost block w-full text-center text-sm text-[var(--muted)]"
      >
        {launch.ctaLabel.replace("で乗る", "アプリを開く")}
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <a
        href={launch.appOrWeb}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-sm"
      >
        {launch.ctaLabel}
      </a>
      <div className="flex gap-2">
        <a
          href={launch.mapsHint}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1 !py-2 text-center text-xs text-[var(--muted)]"
        >
          地図で場所
        </a>
        <a
          href={launch.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1 !py-2 text-center text-xs text-[var(--muted)]"
        >
          アプリを入れる
        </a>
      </div>
    </div>
  );
}
