"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, Store, Wrench, Users } from "lucide-react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const features = [
  {
    id: "playground",
    icon: Wrench,
    title: "플레이그라운드",
    subtitle: "노코드 AI 앱 빌더",
    description: "코딩 지식 없이도 드래그 앤 드롭으로 AI 앱을 만들고 현장에 바로 적용할 수 있습니다.",
    defaultImage: "/playground.png",
    highlights: ["노코드/로우코드 개발", "직관적인 워크플로우 구성", "빠른 프로토타이핑"],
  },
  {
    id: "playmaker",
    icon: Users,
    title: "플레이메이커",
    subtitle: "AI 프로젝트 전문 지원팀",
    description: "기획부터 개발, 배포까지 AI 앱 개발의 전 과정을 함께하며 성공적인 AI 도입을 돕습니다.",
    defaultImage: "/playmaker.png",
    highlights: ["전문가 기술 자문", "프로젝트 전 과정 지원", "현장 맞춤 솔루션"],
  },
  {
    id: "showcase",
    icon: Store,
    title: "쇼케이스",
    subtitle: "동료가 만든 AI 앱 마켓",
    description: "현장에서 검증된 AI 앱을 한눈에 둘러보고 바로 사용하거나 내 업무에 맞게 커스터마이징할 수 있습니다.",
    defaultImage: "/showcase.png",
    highlights: ["검증된 AI 앱 템플릿", "원클릭 복사 & 커스터마이징", "동료의 아이디어 공유"],
  },
  {
    id: "miso-ai",
    icon: Sparkles,
    title: "미소AI",
    subtitle: "우리 회사를 아는 AI 에이전트",
    description: "사내 문서와 업무 프로세스를 학습한 AI가 질의응답부터 업무 자동화까지 지원합니다.",
    defaultImage: "/miso-ai.png",
    highlights: ["사내 지식 기반 학습", "실시간 질의응답", "업무 효율 향상"],
  },
]

export function MisoIntroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }
      },
      { threshold: 0.5 },
    )

    if (videoRef.current) {
      videoObserver.observe(videoRef.current)
    }

    return () => videoObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-slide effect for desktop tabs (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const currentFeature = features[activeFeature]
  const currentImage = currentFeature.defaultImage

  return (
    <section ref={sectionRef} className="relative py-32 bg-background border-b border-border/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto space-y-20">
          <div
            className={`text-center space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">AX Playground</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              AI로 일하는 방식을 바꾸다
              <br />
              <span className="text-primary">{"AX Playground, MISO"}</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              MISO는 <strong className="text-foreground">GS그룹의 현장에서 검증된 AI 업무혁신 플랫폼</strong>입니다.
              <br />
              생성형 AI를 기반으로 업무 자동화, 아이디어 구현, 데이터 분석까지
              <br />
              누구나 스스로 AI를 활용해 비즈니스 임팩트를 만드는 환경을 제공합니다.
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/67MlM2dUlN8?enablejsapi=1&mute=1"
                title="MISO 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl md:text-4xl font-bold">MISO의 4가지 핵심 기능</h3>
              <p className="text-base md:text-lg text-muted-foreground">AI를 활용한 업무 혁신을 위한 완전한 생태계</p>
            </div>

            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Desktop: Tab-based layout */}
              <div className="hidden md:grid md:grid-cols-[200px_1fr] gap-6">
                {/* Vertical tabs on the left */}
                <div className="flex flex-col gap-2">
                  {features.map((feature, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`px-4 py-2 text-sm text-center font-semibold transition-all border-[3px] border-black whitespace-nowrap rounded-lg
                          ${
                            activeFeature === index
                              ? "bg-primary text-primary-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]"
                              : "bg-secondary text-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
                          }
                        `}
                      >
                        {feature.title}
                      </button>
                    )
                  })}
                </div>

                {/* Content area on the right */}
                <Card className="overflow-hidden p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                  <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={currentImage || "/placeholder.svg"}
                      alt={currentFeature.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = currentFeature.icon
                        return (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        )
                      })()}
                      <div>
                        <h3 className="text-2xl font-bold">{currentFeature.title}</h3>
                        <p className="text-sm text-muted-foreground">{currentFeature.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">{currentFeature.description}</p>

                    <div className="pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {currentFeature.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Mobile: Carousel layout */}
              <div className="md:hidden">
                <Carousel setApi={setApi} className="w-full">
                  <CarouselContent>
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <CarouselItem key={index} className="h-[600px]">
                          <Card className="h-full overflow-hidden p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col">
                            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image
                                src={feature.defaultImage || "/placeholder.svg"}
                                alt={feature.title}
                                fill
                                className="object-contain"
                              />
                            </div>

                            <div className="flex-1 flex flex-col gap-5">
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                                  <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                                </div>
                              </div>

                              <p className="text-base text-muted-foreground leading-relaxed flex-1">{feature.description}</p>

                              <div className="pt-4 border-t shrink-0">
                                <div className="flex flex-wrap gap-2">
                                  {feature.highlights.map((highlight, idx) => (
                                    <div
                                      key={idx}
                                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium"
                                    >
                                      {highlight}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>

                {/* Carousel indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-2 rounded-full transition-all ${
                        current === index
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
