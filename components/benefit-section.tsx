"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Lightbulb, Rocket, Users, TrendingUp, Heart, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Rocket,
    title: "프로젝트 오너십",
    description:
      "주어진 업무가 아닌, 직접 기획하고 실행하는 프로젝트 리더가 됩니다. 아이디어 제안부터 팀 구성, 실행, 성과 측정까지 전 과정을 주도하며 진짜 '내 프로젝트'를 만들어갑니다.",
  },
  {
    icon: Sparkles,
    title: "AI 실전 경험",
    description:
      "최신 AI 기술을 단순히 배우는 것이 아니라, 실제 조직 문제에 적용하며 체득합니다. LLM, 생성형 AI, 자동화 도구를 활용한 실전 프로젝트를 통해 AI 전문성을 빠르게 확보합니다.",
  },
  {
    icon: TrendingUp,
    title: "사업화 경험",
    description:
      "AI 대외사업 파일럿을 직접 기획하고 실행합니다. 고객사 미팅, 제안서 작성, 프로젝트 운영까지 실제 비즈니스 전 과정을 경험하며 사업 감각을 키웁니다.",
  },
  {
    icon: Lightbulb,
    title: "실험과 도전의 자유",
    description:
      "'해봐도 될까요?'가 아닌 '이렇게 해보겠습니다'로 시작합니다. 새로운 시도를 장려하는 문화 속에서 실패를 두려워하지 않고 혁신적인 아이디어를 실험할 수 있습니다.",
  },
  {
    icon: Users,
    title: "크로스펑셔널 협업",
    description:
      "기획자, 디자이너, 개발자, 퍼실리테이터가 한 팀으로 움직입니다. 다양한 전문가들과 협업하며 시야를 넓히고, 통합적 사고력을 키웁니다.",
  },
  {
    icon: Heart,
    title: "임팩트 중심 문화",
    description:
      "내가 만든 프로그램이 조직의 일하는 방식을 바꾸고, 사람들의 업무 효율을 높이는 것을 직접 목격합니다. 숫자가 아닌 진짜 변화를 만드는 일의 의미를 경험합니다.",
  },
]

const recommendations = [
  "AI 시대에 맞는 새로운 역량을 빠르게 습득하고 싶은 분",
  "단순 실무자가 아닌 프로젝트 리더로 성장하고 싶은 분",
  "조직 혁신과 변화 관리에 관심이 있는 분",
  "의미 있는 임팩트를 만들고 싶은 분",
]

export function BenefitSection() {
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
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-muted/40 to-muted/20 border-b border-border/20"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Studio 경험 */}
          <div
            className={`text-center space-y-3 md:space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">52g Studio에서만 경험할 수 있는 것</h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              단순한 업무가 아닌, 조직의 변화를 이끄는 프로젝트 오너로 성장합니다.
              <br />
              AI와 혁신의 최전선에서 실전 경험을 쌓고, 의미 있는 임팩트를 만들어갑니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={benefit.title}
                  className={`p-6 space-y-4 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 md:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold">{benefit.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>

          <div
            className={`mt-12 p-6 md:p-8 bg-primary/5 rounded-lg border border-primary/10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold">52g Studio는 이런 분들에게 특히 추천합니다</h3>
              <div className="space-y-3">
                {recommendations.map((recommendation) => (
                  <div key={recommendation} className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-sm md:text-base">✓</span>
                    <p className="text-sm md:text-base text-muted-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
