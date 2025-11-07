"use client"

import { useEffect, useRef, useState } from "react"
import {
  ExternalLink,
  Lightbulb,
  Users,
  Rocket,
  Target,
  Wrench,
  MessageCircle,
  BarChart3,
  GraduationCap,
  Zap,
  Plane,
  TrendingUp,
  Award,
  UserCheck,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const highlights = [
  {
    icon: Lightbulb,
    title: "현장 중심 혁신",
    description: "현장에서 시작된 아이디어가 실제 비즈니스 임팩트로",
  },
  {
    icon: Users,
    title: "오픈 이노베이션",
    description: "구성원 스스로 변화의 주체가 되는 문화",
  },
  {
    icon: Rocket,
    title: "빠른 실행",
    description: "디자인씽킹으로 아이디어를 빠르게 검증하고 실행",
  },
  {
    icon: Target,
    title: "실질적 성과",
    description: "단순한 디지털 도입이 아닌 일하는 방식의 혁신",
  },
]

const problemSolvingApproaches = [
  {
    icon: Wrench,
    title: "디지털 기술을 더해 편리하게 일할 수 있도록",
    description:
      "작은 불편함을 발견하고 개선하는 것에서 시작합니다. 반복 업무를 자동화하거나, 협업을 간소화하는 작은 시도가 지속적인 변화의 출발점이 됩니다.",
    link: "https://www.52g.gs/case-studies/automation",
  },
  {
    icon: MessageCircle,
    title: "고객의 문제에 공감하며 시작할 수 있도록",
    description:
      "모든 일은 '문제를 올바르게 정의하는 것'에서 시작합니다. 고객의 입장을 이해하고 공감하며, 진짜 해결해야 할 문제를 찾아갑니다.",
    link: "https://www.52g.gs/case-studies/empathy",
  },
  {
    icon: BarChart3,
    title: "데이터 기반으로 의사결정할 수 있도록",
    description:
      "감이 아닌 데이터로 판단하고, 빠르고 설득력 있게 의사결정을 내립니다. 고객 데이터에서 인사이트를 찾아, 실질적인 변화를 만듭니다.",
    link: "https://www.52g.gs/case-studies/data-driven",
  },
]

const activities = [
  {
    icon: Zap,
    title: "PLAI 해커톤",
    summary: "짧은 시간 내에 집중도 있게 현장과 고객의 문제를 해결하는 디지털 아이디어를 제안합니다.",
    details:
      "24~48시간 동안 팀을 이뤄 실제 문제를 AI로 해결하는 프로토타입을 만듭니다. 아이디어 구상부터 구현, 발표까지 전 과정을 경험하며 우수 아이디어는 실제 사업화 지원을 받습니다.",
    image: "/PLAI해커톤.jpg",
  },
  {
    icon: GraduationCap,
    title: "AX기초교육",
    summary: "GenAI 기초 이론부터 내 업무를 돕는 AI 에이전트 만들기까지 2일 과정으로 배워봅니다.",
    details:
      "생성형 AI의 작동 원리부터 프롬프트 엔지니어링, 실무 활용까지 체계적으로 학습합니다. 2일차에는 AI 에이전트를 직접 만들어보며 코딩 경험 없이도 바로 업무에 적용 가능합니다.",
    image: "/AX기초교육.png",
  },
  {
    icon: Users,
    title: "문제발굴 워크샵",
    summary: "디자인씽킹 방법론으로 현장의 실제 문제를 발굴하고 AI 솔루션을 함께 설계합니다.",
    image: "/문제발굴워크샵.jpg",
    details:
      "디자인씽킹 방법론을 활용하여 현장의 실제 문제를 발굴하고 정의합니다. 고객 인터뷰와 데이터 분석을 통해 진짜 해결해야 할 문제를 찾아내고, 팀 협업으로 AI 솔루션을 함께 설계합니다.",
  },
  {
    icon: Plane,
    title: "해외 트레이닝 프로그램",
    summary: "실리콘밸리를 직접 방문하여 최신 AI 트렌드와 글로벌 혁신 사례를 체험합니다.",
    image: "/해외 트레이닝 프로그램.jpg",
    details:
      "실리콘밸리와 글로벌 AI 허브를 직접 방문하여 최신 트렌드와 혁신 사례를 경험합니다. 현지 스타트업과의 네트워킹을 통해 글로벌 관점을 확장하고, 실제 비즈니스 현장의 AI 활용 사례를 체험합니다.",
  },
]

export function CompanyIntroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    console.log("[v0] CompanyIntroSection mounted")
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("[v0] Intersection observed:", entry.isIntersecting)
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }, // Reduced threshold for mobile
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 bg-gradient-to-b from-muted/20 to-muted/40 border-b border-border/20"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
          <div
            className={`text-center space-y-4 md:space-y-6 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">About 52g Studio</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight px-2">
              현장의 새로운 도전을 돕는
              <br />
              <span className="text-primary">Open Innovation GS, 52g </span>
            </h2>

            <div className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4">
              <p className="space-y-2">
                <span className="block">52g Studio는 AX의 다음 단계를 준비하고 있습니다.</span>
                <span className="block">
                  GS그룹의 현장에서 시작된 변화를 넘어서, AI와 일하는 문화를 확장하는 새로운 도전을 시작합니다.
                </span>
                <span className="block">기업에서 AX 전환이 이루어질 수 있도록 MISO 기반한 AX패키지를 운영하며</span>
                <span className="block">
                  대내외 AX 생태계 확산을 만들어가는 AI 대외사업 파일럿을 함께 설계하게 됩니다.
                </span>
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Card className="p-6 md:p-8 space-y-4 md:space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-3 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-primary">나에게 주어질 기회</h3>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">AX 전문성 강화</h4>
                    <p className="text-sm text-muted-foreground">
                      AI 기술부터 서비스 기획까지 실전 프로젝트로 전문성을 쌓습니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">사업화 실전 경험</h4>
                    <p className="text-sm text-muted-foreground">
                      아이디어부터 비즈니스 모델 수립까지 전 과정을 경험합니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">커리어 성장 트랙</h4>
                    <p className="text-sm text-muted-foreground">AX 핵심 인력으로 성장할 수 있는 기회가 열립니다.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 space-y-4 md:space-y-6 bg-gradient-to-br from-muted/50 to-muted/30">
              <div className="space-y-3 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">파견 회사 베네핏</h3>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">그룹 AI 생태계 참여</h4>
                    <p className="text-sm text-muted-foreground">
                      GS그룹 전체의 AI 혁신 네트워크에 참여하여 최신 기술을 공유받습니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">핵심 인재 육성</h4>
                    <p className="text-sm text-muted-foreground">
                      우수 인재에게 특별한 성장 기회를 제공하여 조직의 AI 챔피언을 양성합니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">저위험 혁신 실험</h4>
                    <p className="text-sm text-muted-foreground">낮은 비용과 리스크로 AI 사업화 전문성을 확보합니다.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div
            className={`space-y-6 md:space-y-8 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center space-y-4">
              <p className="text-base md:text-lg font-medium text-foreground px-4">
                52g Studio와 함께 AX의 다음 단계를 만들어갈 당신을 기다립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button size="lg" className="text-base px-8 w-full">
                    지금 도전하기
                  </Button>
                </Link>
                <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent w-full sm:w-auto">
                  <a
                    href="https://www.52g.gs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    52g 더 알아보기
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`space-y-8 md:space-y-12 pt-8 md:pt-12 border-t transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/zhdyu5XcqdA?si=XpY3O0CQ7V_dZSVu&enablejsapi=1&mute=1"
                title="52g 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div
            className={`space-y-6 md:space-y-8 pt-8 md:pt-12 border-t transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center space-y-3 md:space-y-4 px-4">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">우리의 활동</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                다양한 프로그램을 통해 현장의 혁신을 지원합니다
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {activities.map((activity, index) => {
                const Icon = activity.icon
                const isFlipped = flippedCards.has(index)
                return (
                  <div key={activity.title} className="w-full">
                    <div
                      className="relative h-[350px] md:h-[400px]"
                      style={{
                        perspective: "1000px",
                      }}
                    >
                      <div
                        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        }}
                        onClick={() => toggleCard(index)}
                      >
                        <Card
                          className="absolute inset-0 overflow-hidden hover:shadow-xl p-0"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="relative h-full">
                            <Image
                              src={activity.image || "/placeholder.svg"}
                              alt={activity.title}
                              fill
                              className="object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                              <div className="flex items-center gap-2 md:gap-3 text-white mb-2 md:mb-3">
                                <Icon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                                <h4 className="text-base md:text-xl font-semibold">{activity.title}</h4>
                              </div>
                              <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                                {activity.summary}
                              </p>
                              <div className="text-white/60 text-xs flex items-center gap-1">
                                <span>탭해서 자세히 보기</span>
                                <span>→</span>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card
                          className="absolute inset-0 overflow-hidden hover:shadow-xl bg-card"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                              <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                              </div>
                              <h4 className="text-base md:text-xl font-semibold">{activity.title}</h4>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                              {activity.details}
                            </p>
                            <div className="text-muted-foreground/60 text-xs flex items-center gap-1 mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                              <span>탭해서 돌아가기</span>
                              <span>←</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={`text-center space-y-3 md:space-y-4 px-4 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </section>
  )
}
