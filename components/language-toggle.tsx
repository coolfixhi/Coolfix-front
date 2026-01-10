"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  currentLang: string
  onToggle: () => void
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onToggle} className="gap-2 font-semibold">
      <Globe className="h-4 w-4" />
      {currentLang === "es" ? "EN" : "ES"}
    </Button>
  )
}
