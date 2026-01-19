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
    <section id="nosotros" className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{t.why.title}</h2>
          <p className="text-pretty text-lg text-muted-foreground">{t.why.subtitle}</p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group animate-fade-in-up border-2 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 hover:border-primary hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="mb-2 sm:mb-2.5 md:mb-3 text-base sm:text-lg md:text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
