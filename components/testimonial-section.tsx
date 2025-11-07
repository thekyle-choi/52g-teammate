"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "한만호 Ryan",
    role: "Developer",
    nickname: "라이언",
    content:
      "다양한 도메인의 회사들과 협업하며 새로운 AI 기술을 접하고, 이를 업무에 바로 적용할 수 있었던 경험은 큰 즐거움이자 성장의 원동력이 되었습니다. ",
    title: "다양한 도메인을 경험하며 성장하다",
  },
  {
    name: "주영재 Young",
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
      "이제 조직과 개인은 AI를 도구로 사용하는 수준을 넘어, AI와 함께 사고하고 협업하며 문제를 해결하는 새로운 패러다임으로 전환하고 있습니다. 52g는 다양한 산업 현장에서 AX를 설계하고, 그 가치를 실현해갑니다.",
    title: "AX, 일하는 방식을 새롭게 디자인하다",
  },
  {
    name: "박은아 BOM",
    role: "Learning Lab",
    nickname: "",
    content:
      "'AI는 기술이 아니라 문명'이라고 합니다. 52g 러닝랩은 단순 기술교육에 그치지 않고, AI로 조직이 변화할 수 있도록 돕는 이노베이션 프로그램을 만드는 문명의 설계자로 성장합니다.",
    title: "기술을 넘어 문화를 만들다",
  },
  {
    name: "허영수 Leo",
    role: "S/W Engineer",
    nickname: "",
    content:
      "AI 전환의 최전선에서 우리는 틀에 갇히지 않은 사고로 실행하고, 빠르게 배우며 성장합니다. 단순히 무언가를 만드는 데 그치지 않고, 100배 더 나은 방법을 끊임없이 탐구합니다. 작은 시도 속에서도 성장의 가능성을 발견하고, 긍정적인 변화를 널리 확산시키는 문제 해결자로 나아갑니다.",
    title: "100X 마인드셋",
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
      {/* 헤더는 컨테이너 안에 유지 */}
      <div className="container px-4 mx-auto mb-12 md:mb-16">
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
      </div>

      {/* 카드 영역은 전체 너비로 확장하여 오버플로우 */}
      <div className="relative overflow-x-hidden">
        <div className="flex gap-4 md:gap-6 animate-scroll-left pl-4 md:pl-6">
          {/* 카드들을 2번 반복하여 무한 스크롤 효과 */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
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
    </section>
  )
}
