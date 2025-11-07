"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Ryan 한만호",
    role: "Developer",
    nickname: "라이언",
    content:
      "다양한 도메인의 회사들과 협업하며 새로운 AI 기술을 접하고, 이를 업무에 바로 적용할 수 있었던 경험은 큰 즐거움이자 성장의 원동력이 되었습니다. 새로운 도전 속에서 얻은 배움과 성취가 앞으로의 가능성을 더욱 넓혀줍니다.",
    title: "다양한 도메인을 경험하며 성장하다",
  },
  {
    name: "Young 주영재",
    role: "GTM Manager",
    nickname: "",
    content:
      "52g는 지금까지의 경험과 직무 노하우를 융합하고 재정의하여 새로운 방식으로 도약할 수 있는 기회를 제공합니다. 그 기반이 AX라는 것에 매일 더 빠른 속도감을 느끼며 성장하고 있습니다.",
    title: "AX 기반의 커리어 확장과 새로운 기회",
  },
  {
    name: "박주리 Julie",
    role: "UX Designer",
    nickname: "",
    content:
      "AI 기반 CX 플랫폼으로 고객 행동·유형·VoC 데이터를 통합 분석하여 서비스 품질 향상과 현장 운영 개선 인사이트를 도출하고, 지속적인 고객 경험을 개선하는데 활용하고 있어요.",
    title: "AI로 입체적인 고객 경험 분석",
  },
  {
    name: "박은아 BOM",
    role: "Learning Lab",
    nickname: "",
    content:
      "'AI는 기술이 아니라 문명'이라고 합니다. 52g 러닝랩은 단순 기술교육에 그치지 않고, AI로 조직이 변화할 수 있도록 돕는 이노베이션 프로그램을 만드는 문명의 설계자로 성장합니다.",
    title: "기술을 넘어 문화를 만들다",
  },
]

export function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 bg-primary/5 border-b border-border/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div
            className={`text-center space-y-4 md:space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">52g Studio의 이야기</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              현장에서 시작된 변화, 함께 만들어가는 AX의 미래
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-4 md:gap-6 animate-scroll-left">
              {testimonials.map((testimonial, index) => (
                <Card key={`testimonial-${index}`} className="flex-shrink-0 w-[300px] md:w-[380px]">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">{testimonial.title}</h3>

                    <p className="text-sm md:text-base text-foreground mb-6 flex-grow leading-relaxed">
                      {testimonial.content}
                    </p>

                    <div className="pt-4 border-t border-border/50 space-y-1">
                      <p className="font-semibold text-base md:text-lg">{testimonial.name}</p>
                      <p className="text-sm md:text-base text-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
