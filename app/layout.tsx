import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
});

export const metadata: Metadata = {
  title: "シェアポートいま何台？（仮）",
  description:
    "近くのシェアポートと貸出可否をまとめて見る。最初期は福岡から。チャリチャリ・LUUP・ラクすく対応予定。",
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
