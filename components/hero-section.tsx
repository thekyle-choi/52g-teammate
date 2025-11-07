"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MISO%202.0-TKKkGKItTbsFDUxXwPwsIElHNvEyt6.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-[1]" />

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="text-sm font-mono text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              커리어 성장 × AI 경험 × 실전 환경
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg px-4">
            <div className="break-keep">지금이 도전할 타이밍!</div>
            <div className="break-keep">52g Studio 모집 </div>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-pretty drop-shadow-md px-4">
            52g Studio는 GS그룹의 AX 전환을 선도하는 팀입니다.
            <br className="hidden sm:block" />
            AI와 함께 일하는 방식을 혁신하며, 현장의 변화를 이끌 플레이어를 기다립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/apply">
              <Button size="lg" className="text-base group shadow-xl">
                지금 지원하기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full opacity-40 z-[1]" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-white/20 rounded-full opacity-40 z-[1]" />

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-[1]" />
    </section>
  )
}
