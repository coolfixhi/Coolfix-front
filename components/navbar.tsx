"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LanguageToggle } from "./language-toggle"
import { Menu, X } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface NavbarProps {
  t: TranslationKey
  lang: string
  onLanguageToggle: () => void
}

export function Navbar({ t, lang, onLanguageToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      const navbarHeight = 80 // Altura del navbar más padding
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 800 // Duración en milisegundos para un scroll más visible y fluido
      let start: number | null = null

      // Función de easing para un movimiento más natural (ease-in-out)
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animateScroll = (currentTime: number) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        
        // Aplicar función de easing
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          // Asegurar que llegamos exactamente al destino
          window.scrollTo(0, offsetPosition)
        }
      }

      requestAnimationFrame(animateScroll)
    }

    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.about, href: "#nosotros" },
    { label: t.nav.testimonials, href: "#testimonios" },
    { label: t.nav.hours, href: "#horario" },
    { label: t.nav.contact, href: "#contacto" },
  ]

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="/img/LogoCoolfix.svg" 
              alt="COOLFIX" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 lg:gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            <LanguageToggle currentLang={lang} onToggle={onLanguageToggle} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t">
              <LanguageToggle currentLang={lang} onToggle={onLanguageToggle} />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
