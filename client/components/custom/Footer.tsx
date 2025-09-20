"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-8 border-t border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved to Ammu
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Crafted with{" "}
            <span className="text-red-500 animate-pulse">♥</span>{" "}
            and Patience
          </p>
          <p className="text-sm text-muted-foreground/70">
            Yours truly, Chinnu.
          </p>
        </div>
      </div>
    </footer>
  )
}
