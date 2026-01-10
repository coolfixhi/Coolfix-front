"use client"

import { useState } from "react"
import { translations, type Language } from "@/lib/translations"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhySection } from "@/components/why-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { HoursSection } from "@/components/hours-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function Home() {
  const [lang, setLang] = useState<Language>("es")

  const toggleLanguage = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"))
  }

  const t = translations[lang]

  return (
    <main className="min-h-screen">
      <Navbar t={t} lang={lang} onLanguageToggle={toggleLanguage} />
      <HeroSection t={t} />
      <ServicesSection t={t} />
      <WhySection t={t} />
      <TestimonialsSection t={t} />
      <HoursSection t={t} />
      <ContactFormSection t={t} />
      <Footer t={t} />
      <FloatingWhatsApp />
    </main>
  )
}
