import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Maru_Gothic } from "next/font/google";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/product";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
});

const shippori = Shippori_Mincho({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
});

export const metadata: Metadata = {
  title: `${PRODUCT_NAME}（仮）— ${PRODUCT_TAGLINE}`,
  description:
    "チャリチャリ・LUUP・ラクすくを横断して近くのポートと貸出可否を見るピッチ用デモ。予約は各社公式アプリへ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenMaru.variable} ${shippori.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-zen-maru)]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
