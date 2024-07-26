import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "짤뮤니티 | 나만을 위한 취향 저격 짤 추천",
  description: "본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!",
  keywords: "짤, 이미지, 밈, 짤 검색, 짤 추천",
  openGraph: {
    type: "website",
    url: "https://www.zzalmyu.asia",
    title: "짤뮤니티 | 나만을 위한 취향 저격 짤 추천",
    description: "본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!",
  },
  twitter: {
    title: "짤뮤니티 | 나만을 위한 취향 저격 짤 추천",
    description: "본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!",
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light" className={`${pretendard.variable}`}>
      <GoogleAnalytics gaId="G-6PY1WDK5P6" />
      <body className={pretendard.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
