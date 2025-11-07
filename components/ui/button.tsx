import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-black dark:border-gray-600 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1",
        destructive:
          "bg-destructive text-white border-2 border-black dark:border-gray-600 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1",
        outline:
          "border-2 border-black dark:border-gray-600 bg-background hover:bg-accent shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-black dark:border-gray-600 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
