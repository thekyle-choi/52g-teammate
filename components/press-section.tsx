"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

export function PressSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const articles = [
    {
      title: "GS, 글로벌 AI 기업 버셀과 손잡아…플랫폼 '미소' 키운다",
      publisher: "아시아경제",
      date: "2025.10.24",
      url: "https://www.asiae.co.kr/article/2025102409003575091",
      thumbnail: "https://cphoto.asiae.co.kr/listimglink/1/2025102408485079405_1761263330.jpg",
    },
    {
      title: "AI 전환? ... 회장님의 질문 '무슨 문제를 해결하려는거요?'",
      publisher: "더밀크",
      date: "2025.09.15",
      url: "https://themiilk.com/articles/a29fec356",
      thumbnail:
        "https://dsi523du1o5iq.cloudfront.net/fit-in/904x0/production/article/db21257d85/cc9b7644af_1757955286",
    },
    {
      title: "GS그룹, AI 에이전트 혁신 사례 공유",
      publisher: "세계일보",
      date: "2025.07.03",
      url: "https://www.segye.com/newsView/20250702515387?OutUrl=naver",
      thumbnail: "https://www.segye.com/content/image/2025/07/02/20250702517610.jpg",
    },
    {
      title: "GS그룹, 글로벌 협업툴 '노션'과 맞손…생성형 AI 활용 속도",
      publisher: "SBS Biz",
      date: "2024.11.06",
      url: "https://biz.sbs.co.kr/article/20000200335",
      thumbnail: "https://img.biz.sbs.co.kr/upload/2024/11/06/yX31730893610010-850.jpg",
    },
    {
      title: "GS 글로벌 LLM 기업 라마인덱스와 기술교류, 자체 AI 개발 플랫폼 '미르' 소개",
      publisher: "비즈니스포스트",
      date: "2024.09.27",
      url: "https://www.businesspost.co.kr/BP?command=article_view&num=367137",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">52g 뉴스룸</h2>
          </div>

          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {articles.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border-2 border-black bg-card hover:bg-accent/5 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <img
                    src={article.thumbnail || "/placeholder.svg"}
                    alt={article.title}
                    className="w-20 h-16 md:w-32 md:h-24 object-cover rounded-lg flex-shrink-0 border-2 border-black"
                  />
                  <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm">
                      <span className="text-primary font-semibold">{article.publisher}</span>
                      <h3 className="text-sm md:text-base lg:text-lg font-medium leading-relaxed group-hover:text-primary transition-colors break-words md:hidden">
                        {article.title}
                      </h3>
                      <span className="text-muted-foreground text-xs md:text-sm">{article.date}</span>
                    </div>
                    <h3 className="hidden md:block text-base lg:text-lg font-medium leading-relaxed group-hover:text-primary transition-colors break-words">
                      {article.title}
                    </h3>
                  </div>
                  <ExternalLink className="hidden md:block h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
