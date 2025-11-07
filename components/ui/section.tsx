import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: "default" | "muted"
  size?: "sm" | "md" | "lg"
}

export function Section({ children, className, variant = "default", size = "lg" }: SectionProps) {
  const sizeClasses = {
    sm: "py-12",
    md: "py-16",
    lg: "py-24",
  }

  const variantClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
  }

  return (
    <section className={cn(sizeClasses[size], variantClasses[variant], className)}>
      {children}
    </section>
  )
}

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Container({ children, className, size = "lg" }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  }

  return <div className={cn("container px-4 mx-auto", sizeClasses[size], className)}>{children}</div>
}

interface SectionHeaderProps {
  badge?: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-4", className)}>
      {badge && (
        <div className="inline-block">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {description && (
        <div className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </div>
      )}
    </div>
  )
}
