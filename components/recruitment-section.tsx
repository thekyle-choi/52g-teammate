"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

const recruitmentData = [
  {
    label: "모집 대상",
    content:
      "AX사업을 함께 만들어갈 열정있는 GS그룹 구성원\n• AI/DT 역량 보유자\n• 52g 활동 경험자\n• AX 사업 확산에 기여 가능한 사내 추천자",
  },
  {
    label: "선발 인원",
    content: "3 - 5명",
  },
  {
    label: "파견 기간",
    content: "2026년 1월 ~ 2027년 12월(약 2년)",
  },
  {
    label: "주요 업무",
    content:
      "• 계열사·외부사 대상 AX 프로젝트 코칭\n• AX커뮤니티 운영 (교육, 워크샵, 해커톤 등)\n• 현장 AX 유스케이스 분석 및 확산\n• MISO 플랫폼 개발 및 고도화\n• 버티컬 AI 애플리케이션 / SLM (경량모델) 개발\n• MISO 플랫폼 기반 사업 모델 기획 및 PoC 추진",
  },
]

const applicationSteps = [
  {
    icon: FileText,
    step: "STEP 1",
    title: "지원서 제출",
    description: "간단한 지원서와 포트폴리오를 제출해주세요. 형식보다는 열정과 경험이 중요합니다.",
  },
  {
    icon: Users,
    step: "STEP 2",
    title: "인터뷰",
    description: "52g Studio 팀과 편안한 대화를 나눕니다. 서로를 알아가는 시간입니다.",
  },
  {
    icon: CheckCircle,
    step: "STEP 3",
    title: "합류",
    description: "환영합니다! 온보딩 프로그램을 통해 빠르게 적응하고 첫 프로젝트를 시작합니다.",
  },
]

export function RecruitmentSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} className="relative py-32 bg-background border-b border-border/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-16">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">모집 안내</h2>
          </div>

          <Card
            className={`overflow-hidden transition-all duration-700 hover:shadow-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="divide-y">
              {recruitmentData.map((item, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-6">
                  <div className="font-semibold md:col-span-1">{item.label}</div>
                  <div className="text-muted-foreground md:col-span-3 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div
            className={`text-center pt-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/apply">
              <Button size="lg" className="text-base group">
                지금 지원하기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
