"use client"

import { Card } from "@/components/ui/card"
import { Award, Clock, Shield, DollarSign, AlertCircle } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface WhySectionProps {
  t: TranslationKey
}

export function WhySection({ t }: WhySectionProps) {
  const features = [
    {
      icon: Award,
      title: t.why.certified.title,
      description: t.why.certified.description,
    },
    {
      icon: Clock,
      title: t.why.fast.title,
      description: t.why.fast.description,
    },
    {
      icon: Shield,
      title: t.why.guarantee.title,
      description: t.why.guarantee.description,
    },
    {
      icon: DollarSign,
      title: t.why.price.title,
      description: t.why.price.description,
    },
    {
      icon: AlertCircle,
      title: t.why.emergency.title,
      description: t.why.emergency.description,
    },
  ]

  return (
    <section id="nosotros" className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mb-3 sm:mb-4 text-balance text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">{t.why.title}</h2>
          <p className="text-pretty text-sm sm:text-base md:text-lg text-muted-foreground">{t.why.subtitle}</p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group animate-fade-in-up border-2 p-4 sm:p-5 transition-all duration-300 hover:border-primary hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
