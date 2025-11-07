import { useEffect, useState, useRef, RefObject } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.2, rootMargin = "0px", freezeOnceVisible = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // If already visible and freeze is enabled, don't observe
    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, freezeOnceVisible, isVisible])

  return [elementRef, isVisible]
}
