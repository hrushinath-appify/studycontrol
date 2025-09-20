"use client"

import Link from "next/link"
import { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  href?: string
  icon?: ReactNode
  className?: string
  colSpan?: "1" | "2" | "3" | "full"
}

export default function FeatureCard({
  title,
  description,
  href,
  icon,
  className = "",
  colSpan = "1"
}: FeatureCardProps) {
  const colSpanClasses = {
    "1": "",
    "2": "sm:col-span-2 lg:col-span-1",
    "3": "sm:col-span-2 lg:col-span-3",
    "full": "col-span-full"
  }

  const cardContent = (
    <div className={`p-4 sm:p-6 bg-card rounded-lg border border-border/50 hover:shadow-md hover:border-border transition-all duration-200 ${colSpanClasses[colSpan]} ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-primary">
              {icon}
            </div>
          )}
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block group">
        <div className={`p-4 sm:p-6 bg-card rounded-lg border border-border/50 hover:shadow-md hover:border-border transition-all duration-200 group-hover:scale-[1.02] ${colSpanClasses[colSpan]} ${className}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                  {icon}
                </div>
              )}
              <h2 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors duration-200">{title}</h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
          </div>
        </div>
      </Link>
    )
  }

  return cardContent
}
