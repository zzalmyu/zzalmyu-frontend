import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Provider from "@/components/Provider";
import type { Metadata } from "next";
import Header from "@/components/common/Header";
import NavigationFooter from "@/components/common/Footer";
import "./globals.css";

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
        <Provider>
          <div className="relative h-[100dvh] w-[100dvw] overflow-hidden">
            <Header />
            <div className="h-[calc(100%-4.25rem)] sm:pb-0">{children}</div>
            <NavigationFooter />
            <ReactQueryDevtools buttonPosition="top-right" />
          </div>
        </Provider>
      </body>
    </html>
  );
}
