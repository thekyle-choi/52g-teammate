import { HeroSection } from "@/components/hero-section"
import { CompanyIntroSection } from "@/components/company-intro-section"
import { VisionSection } from "@/components/vision-section"
import { MisoIntroSection } from "@/components/miso-intro-section"
import { BenefitSection } from "@/components/benefit-section"
import { RecruitmentSection } from "@/components/recruitment-section"
import { JourneySection } from "@/components/journey-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { ClosingSection } from "@/components/closing-section"
import { PressSection } from "@/components/press-section"
import { Footer } from "@/components/footer"
import { VideoIntroSection } from "@/components/video-intro-section"

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <HeroSection />
      <div id="company-intro">
        <CompanyIntroSection />
      </div>
      <VisionSection />
      <VideoIntroSection />
      <div id="miso">
        <MisoIntroSection />
      </div>
      <div id="benefit">
        <BenefitSection />
      </div>
      <div id="recruitment">
        <RecruitmentSection />
      </div>
      <JourneySection />
      <div id="testimonial">
        <TestimonialSection />
      </div>
      <ClosingSection />
      <PressSection />
      <Footer />
    </main>
  )
}
