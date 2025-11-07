import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "52g Studio 팀원 모집 | 52g",
  description:
    "GS그룹의 AX 전환을 선도할 52g Studio에 합류하여 현장을 움직이는 진정한 AX를 만들어갈 열정적인 플레이어를 찾습니다.",
  generator: "v0.app",
  openGraph: {
    title: "52g Studio 팀원 모집 | 52g",
    description:
      "GS그룹의 AX 전환을 선도할 52g Studio에 합류하여 현장을 움직이는 진정한 AX를 만들어갈 열정적인 플레이어를 찾습니다.",
    url: "https://52g-teammate.vercel.app",
    siteName: "52g Studio",
    images: [
      {
        url: "https://52g-teammate.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "52g Studio 팀원 모집",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "52g Studio 팀원 모집 | 52g",
    description:
      "GS그룹의 AX 전환을 선도할 52g Studio에 합류하여 현장을 움직이는 진정한 AX를 만들어갈 열정적인 플레이어를 찾습니다.",
    images: ["https://52g-teammate.vercel.app/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
