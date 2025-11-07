"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="52g Studio"
              className="h-6 sm:h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("company-intro")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              52g 소개
            </button>
            <button
              onClick={() => scrollToSection("miso")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              MISO
            </button>

            <button
              onClick={() => scrollToSection("recruitment")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              모집 안내
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/apply">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base px-3 sm:px-4"
                size="sm"
              >
                지원하기
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("company-intro")}
                className="text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                52g 소개
              </button>
              <button
                onClick={() => scrollToSection("miso")}
                className="text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                MISO
              </button>
              <button
                onClick={() => scrollToSection("recruitment")}
                className="text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                모집 안내
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
