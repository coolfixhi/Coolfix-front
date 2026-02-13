"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Snowflake, Wind, Waves, Shield } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface HeroSectionProps {
  t: TranslationKey
}

export function HeroSection({ t }: HeroSectionProps) {
  const services = [
    { icon: Snowflake, color: "bg-blue-50 text-primary" },
    { icon: Waves, color: "bg-blue-50 text-primary" },
    { icon: Wind, color: "bg-blue-50 text-primary" },
    { icon: Shield, color: "bg-blue-50 text-primary" },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 sm:pt-20 md:pt-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="grid items-center gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <h1 className="mb-4 sm:mb-6 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground">
              {t.hero.title} <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mb-6 sm:mb-8 text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">{t.hero.subtitle}</p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 w-full sm:w-auto text-sm sm:text-base" asChild>
                <a href="#contacto">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-sm sm:text-base" asChild>
                <a href="#servicios">{t.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`animate-fade-in-up flex h-20 sm:h-24 md:h-32 items-center justify-center rounded-xl sm:rounded-2xl ${service.color} transition-transform hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <service.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
