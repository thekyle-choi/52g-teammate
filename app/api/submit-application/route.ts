import { NextResponse } from "next/server"

const MISO_API_URL = "https://api.holdings.miso.gs/ext/v1/workflows/run"

/**
 * MISO API 에러 코드를 한글 메시지로 변환
 */
function getErrorMessage(errorCode: string, detailMessage?: string): string {
  const errorMessages: Record<string, string> = {
    invalid_param: "잘못된 파라미터가 입력되었습니다. 앱이 발행되지 않았을 수 있습니다. 미소 앱 편집화면에서 저장 버튼을 눌러주세요.",
    app_unavailable: "앱(App) 설정 정보를 사용할 수 없습니다.",
    provider_not_initialize: "사용 가능한 모델 인증 정보가 없습니다.",
    provider_quota_exceeded: "모델 호출 쿼터(Quota)가 초과되었습니다.",
    model_currently_not_support: "현재 모델을 사용할 수 없습니다.",
    workflow_request_error: "워크플로우 실행에 실패했습니다.",
    internal_server_error: "내부 서버 오류가 발생했습니다.",
  }

  const baseMessage = errorMessages[errorCode] || detailMessage || "알 수 없는 오류가 발생했습니다."
  
  if (detailMessage && detailMessage !== baseMessage) {
    return `${baseMessage} (${detailMessage})`
  }
  
  return baseMessage
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const misoApiKey = process.env.MISO_API_KEY

    if (!misoApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "MISO API 키가 설정되지 않았습니다. 관리자에게 문의해주세요.",
        },
        { status: 500 },
      )
    }

    // 필수 필드 검증
    if (!data.organization || !data.name || !data.email) {
      return NextResponse.json(
        {
          success: false,
          error: "기본 정보(소속, 이름, 이메일)를 모두 입력해주세요.",
        },
        { status: 400 },
      )
    }

    if (!data.whyApply || !data.goals || !data.problemSolving || !data.futureVision) {
      return NextResponse.json(
        {
          success: false,
          error: "모든 질문에 답변을 작성해주세요.",
        },
        { status: 400 },
      )
    }

    // 파일 URL 추출 (파일명 제외, 다운로드 링크만)
    const fileLinks = data.files && data.files.length > 0 
      ? data.files.map((f: { url: string }) => f.url).join("\n")
      : undefined

    // MISO API 입력 변수 매핑
    const inputs: Record<string, string> = {
      timestamp: new Date().toISOString(),
      company: data.organization || "",
      name: data.name || "",
      email: data.email || "",
      q1: data.whyApply || "",
      q2: data.goals || "",
      q3: data.problemSolving || "",
      q4: data.futureVision || "",
    }

    // link는 선택 사항이므로 파일이 있을 때만 추가
    if (fileLinks) {
      inputs.link = fileLinks
    }

    // MISO API 호출
    const response = await fetch(MISO_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${misoApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs,
        mode: "blocking",
        user: data.email || "anonymous", // 사용자 식별자로 이메일 사용
      }),
    })

    const responseData = await response.json()

    // 에러 응답 처리
    if (!response.ok) {
      const errorCode = responseData.code || responseData.error?.code || "unknown"
      const detailMessage = responseData.detail || responseData.error?.message || responseData.message
      const errorMessage = getErrorMessage(errorCode, detailMessage)

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: response.status },
      )
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: "지원서가 성공적으로 제출되었습니다.",
      data: responseData,
    })
  } catch (error) {
    console.error("[MISO API] Error submitting application:", error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "지원서 제출 중 알 수 없는 오류가 발생했습니다."

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
