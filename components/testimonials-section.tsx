"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface TestimonialsSectionProps {
  t: TranslationKey
}

export function TestimonialsSection({ t }: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.testimonials.title}</h2>
          <p className="text-pretty text-sm sm:text-base md:text-lg text-muted-foreground px-2">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.testimonials.items.map((testimonial, index) => (
            <Card
              key={index}
              className="animate-fade-in-up p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 italic text-muted-foreground">{`"${testimonial.text}"`}</p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
