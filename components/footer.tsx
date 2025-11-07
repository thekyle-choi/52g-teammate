import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">Copyright © 52g. All rights reserved.</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>52g Lead ally@gs.co.kr</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
