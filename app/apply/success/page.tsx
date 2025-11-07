"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "지원자"
  const email = searchParams.get("email") || ""

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-card rounded-lg border-[3px] border-black dark:border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(75,85,99,1)] p-8 md:p-12 space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle2 className="relative h-20 w-20 text-primary" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              지원서가 성공적으로 제출되었습니다!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{name}</span>님의 지원서를 정상적으로 접수했습니다.
              <br />
              검토 후 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg border-2 border-primary/20 p-6 space-y-3">
            <h2 className="text-lg font-semibold text-primary">다음 단계</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>지원서 검토 기간은 약 1-2주 소요됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  {email && (
                    <>
                      <span className="font-medium">{email}</span>로 결과를 안내드립니다.
                    </>
                  )}
                  {!email && "제출하신 이메일로 결과를 안내드립니다."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>추가 문의사항이 있으시면 언제든지 연락주세요.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/" className="flex-1">
              <Button size="lg" className="w-full group" variant="outline">
                <Home className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            <Button
              size="lg"
              className="flex-1 group"
              onClick={() => router.push("/#recruitment")}
            >
              모집 정보 보기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              52g Studio와 함께 성장할 준비가 되셨나요?
              <br />
              <span className="font-medium text-foreground">지금이 도전할 타이밍입니다!</span>
            </p>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full opacity-40 hidden md:block" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-primary/20 rounded-full opacity-40 hidden md:block" />
      </div>
    </div>
  )
}

export default function ApplySuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

