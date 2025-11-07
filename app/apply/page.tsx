"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, FileText, Loader2, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UploadedFile {
  name: string
  url: string
  size: number
}

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    email: "",
    whyApply: "",
    goals: "",
    problemSolving: "",
    futureVision: "",
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        return {
          name: file.name,
          url: data.url,
          size: file.size,
        }
      })

      const uploadedFiles = await Promise.all(uploadPromises)
      setFiles((prev) => [...prev, ...uploadedFiles])

      toast({
        title: "파일 업로드 완료",
        description: `${uploadedFiles.length}개의 파일이 업로드되었습니다.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "업로드 실패",
        description: "파일 업로드 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.organization || !formData.name || !formData.email) {
      toast({
        title: "기본 정보 입력 필요",
        description: "소속, 이름, 이메일을 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (!formData.whyApply || !formData.goals || !formData.problemSolving || !formData.futureVision) {
      toast({
        title: "질문 답변 입력 필요",
        description: "모든 질문에 답변을 작성해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization: formData.organization,
          name: formData.name,
          email: formData.email,
          whyApply: formData.whyApply,
          goals: formData.goals,
          problemSolving: formData.problemSolving,
          futureVision: formData.futureVision,
          files: files.map((f) => ({ name: f.name, url: f.url })),
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "제출에 실패했습니다.")
      }

      // 성공 시 완료 페이지로 이동
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
      })
      router.push(`/apply/success?${params.toString()}`)
    } catch (error) {
      toast({
        title: "제출 실패",
        description: error instanceof Error ? error.message : "지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return formData.organization && formData.name && formData.email
    }
    return true
  }

  const handleNext = () => {
    if (!canProceedToNextStep()) {
      toast({
        title: "입력 필요",
        description: "현재 단계의 필수 항목을 입력해주세요.",
        variant: "destructive",
      })
      return
    }
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="52g Studio" className="h-6 sm:h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">52g Studio 지원하기</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              GS그룹의 AX 전환을 함께 이끌어갈 열정적인 팀원을 찾습니다
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`h-2 rounded-full transition-colors ${
                      step === currentStep
                        ? "bg-primary w-12"
                        : step < currentStep
                          ? "bg-primary/60 w-8"
                          : "bg-muted-foreground/30 w-8"
                    }`}
                  />
                </div>
              ))}
              <span className="text-sm text-muted-foreground ml-2">{currentStep}/2 단계</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-50 duration-300 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">기본 정보</h3>
                  <p className="text-sm text-muted-foreground">먼저 기본 정보를 입력해주세요.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-base font-medium">
                      소속 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="organization"
                      placeholder="예: GS리테일 디지털혁신팀"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                      className="text-base h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      이름 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="text-base h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      이메일 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gs.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="text-base h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in-50 duration-300">
                {/* Question 1 */}
                <div className="space-y-4 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                  <div className="space-y-4 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <h3 className="text-xl font-bold text-primary">질문 1</h3>
                    <div className="space-y-3">
                      <p className="text-lg font-semibold leading-relaxed">52g Studio에 지원한 이유는 무엇인가요?</p>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                        <p>
                          • 어떤 점이 당신을 움직였는지, 그리고 왜 지금 52g Studio여야 하는지를 자유롭게 이야기해
                          주세요.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg border">
                    <Label htmlFor="whyApply" className="text-base font-medium">
                      답변 작성 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="whyApply"
                      placeholder="지원 동기를 자유롭게 작성해주세요..."
                      value={formData.whyApply}
                      onChange={(e) => setFormData({ ...formData, whyApply: e.target.value })}
                      required
                      rows={8}
                      className="text-base resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.whyApply.length} 자</p>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-4 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                  <div className="space-y-4 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <h3 className="text-xl font-bold text-primary">질문 2</h3>
                    <div className="space-y-3">
                      <p className="text-lg font-semibold leading-relaxed">
                        52g Studio에서 이루고 싶은 목표나 꼭 해보고 싶은 일이 있나요?
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                        <p>
                          • 본인의 경험이나 강점을 바탕으로 어떤 프로젝트를 주도해 보고 싶은지, 또는 어떤 변화를
                          만들어보고 싶은지 구체적으로 알려주세요.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg border">
                    <Label htmlFor="goals" className="text-base font-medium">
                      답변 작성 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="goals"
                      placeholder="52g Studio에서 이루고 싶은 목표를 구체적으로 작성해주세요..."
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      required
                      rows={8}
                      className="text-base resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.goals.length} 자</p>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-4 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                  <div className="space-y-4 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <h3 className="text-xl font-bold text-primary">질문 3</h3>
                    <div className="space-y-3">
                      <p className="text-lg font-semibold leading-relaxed">
                        본인이 주도적으로 문제를 해결하거나 새로운 시도를 했던 경험이 있나요?
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                        <p>• 그 과정에서 어떤 어려움이 있었고, 어떻게 극복했나요?</p>
                        <p>• 구체적인 상황과 본인의 역할, 그리고 결과를 중심으로 작성해주세요.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg border">
                    <Label htmlFor="problemSolving" className="text-base font-medium">
                      답변 작성 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="problemSolving"
                      placeholder="문제 해결 또는 새로운 시도 경험을 구체적으로 작성해주세요..."
                      value={formData.problemSolving}
                      onChange={(e) => setFormData({ ...formData, problemSolving: e.target.value })}
                      required
                      rows={8}
                      className="text-base resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.problemSolving.length} 자</p>
                  </div>
                </div>

                {/* Question 4 */}
                <div className="space-y-4 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                  <div className="space-y-4 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <h3 className="text-xl font-bold text-primary">질문 4</h3>
                    <div className="space-y-3">
                      <p className="text-lg font-semibold leading-relaxed">10년 뒤, 어떤 모습으로 성장하고 싶나요?</p>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                        <p>• 장기적으로 이루고 싶은 목표나 비전을 그려보세요.</p>
                        <p>• 그리고 그 여정에서 52g Studio의 경험이 어떤 의미와 도움이 될지 이야기해 주세요.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg border">
                    <Label htmlFor="futureVision" className="text-base font-medium">
                      답변 작성 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="futureVision"
                      placeholder="10년 후의 비전과 52g Studio 경험의 의미를 작성해주세요..."
                      value={formData.futureVision}
                      onChange={(e) => setFormData({ ...formData, futureVision: e.target.value })}
                      required
                      rows={8}
                      className="text-base resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.futureVision.length} 자</p>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3 bg-white p-8 rounded-lg border-[3px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                  <Label htmlFor="resume" className="text-base font-medium">
                    주요 이력
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    이력서, 포트폴리오 등 본인을 소개할 수 있는 자료를 첨부해주세요. (선택)
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        id="resume"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="cursor-pointer"
                        accept=".pdf,.doc,.docx,.txt,.hwp"
                      />
                      {isUploading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">첨부된 파일 ({files.length})</p>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-muted rounded-lg border"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  이전
                </Button>
              )}
              {currentStep === 1 && (
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    취소
                  </Button>
                </Link>
              )}
              {currentStep < 2 ? (
                <Button type="button" onClick={handleNext} className="flex-1" disabled={!canProceedToNextStep()}>
                  다음
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      제출 중...
                    </>
                  ) : (
                    <>지원하기</>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
