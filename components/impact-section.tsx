"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  {
    value: 12,
    suffix: "개",
    label: "GS그룹 계열사에 연내 순차 도입 중",
  },
  {
    value: 3000,
    suffix: "명+",
    label: "해커톤/교육 누적 참여자",
  },
  {
    value: 4800,
    suffix: "개+",
    label: "현장이 직접 만든 AI앱",
  },
]

export function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState<number[]>([0, 0, 0])

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
    if (!isVisible) return

    const duration = 2000
    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progressValue = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progressValue, 4)

      setCounts(stats.map((stat) => Math.floor(easeOutQuart * stat.value)))

      if (progressValue < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible])

  return (
    null
  )
}
