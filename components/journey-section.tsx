"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { FileText, MessageSquare, Handshake } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "지원서 작성하기",
    description: "여러분의 강점과 가능성을 자유로운 형식으로, 본인의 경험·성과·관심사를 담아주세요.",
  },
  {
    icon: MessageSquare,
    title: "직무/문화적합성 인터뷰",
    description: "제출하신 지원서를 바탕으로 당신의 경험과 52g의 방향이 어떻게 맞닿을 수 있는지 함께 이야기합니다.",
  },
  {
    icon: Handshake,
    title: "처우 협의 및 합류 결정",
    description: "최종 합류를 위한 처우 협의 및 결정 단계입니다.",
  },
]

export function JourneySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    null
  )
}
