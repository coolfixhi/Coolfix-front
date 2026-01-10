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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-primary">
              {t.hero.badge}
            </div>
            <h1 className="mb-6 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {t.hero.title} <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mb-8 text-pretty text-base sm:text-lg md:text-xl text-muted-foreground">{t.hero.subtitle}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
                <a href="#contacto">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <a href="#servicios">{t.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`animate-fade-in-up flex h-24 sm:h-32 items-center justify-center rounded-2xl ${service.color} transition-transform hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <service.icon className="h-8 w-8 sm:h-12 sm:w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
