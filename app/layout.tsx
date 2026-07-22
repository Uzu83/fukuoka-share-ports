import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
});

export const metadata: Metadata = {
  title: "福岡シェアポート（仮）",
  description:
    "福岡市限定。チャリチャリ・LUUP・ラクすくの近くのポートと貸出可否をまとめて見る。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenMaru.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-zen-maru)]">
        {children}
      </body>
    </html>
  );
}
