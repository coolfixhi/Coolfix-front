"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface TestimonialsSectionProps {
  t: TranslationKey
}

export function TestimonialsSection({ t }: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{t.testimonials.title}</h2>
          <p className="text-pretty text-lg text-muted-foreground">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.testimonials.items.map((testimonial, index) => (
            <Card
              key={index}
              className="animate-fade-in-up p-8 transition-all duration-300 hover:shadow-xl"
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
