"use client"

export function DeadlineBanner() {
  const text = "🚨 지원서 1차 마감: ~11/21(금) 오후 6시까지 🚨"

  return (
    <div className="fixed top-16 left-0 right-0 bg-[#5542F6] border-b-[3px] border-black py-2 md:py-2.5 z-40">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <span className="text-white font-semibold text-[10px] md:text-xs lg:text-sm">
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}
