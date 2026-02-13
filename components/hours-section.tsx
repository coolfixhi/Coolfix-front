"use client"

import { Card } from "@/components/ui/card"
import { Clock, AlertCircle } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface HoursSectionProps {
  t: TranslationKey
}

export function HoursSection({ t }: HoursSectionProps) {
  const schedule = [
    {
      day: t.hours.weekdays,
      time: t.hours.weekdaysTime,
      available: true,
    },
    {
      day: t.hours.saturday,
      time: t.hours.saturdayTime,
      available: true,
    },
    {
      day: t.hours.sunday,
      time: t.hours.sundayTime,
      available: false,
    },
  ]

  return (
    <section id="horario" className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.hours.title}</h2>
          <p className="text-pretty text-sm sm:text-base md:text-lg text-muted-foreground px-2">{t.hours.subtitle}</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="overflow-hidden border-2">
            <div className="bg-primary p-4 sm:p-5 md:p-6 text-center text-white">
              <Clock className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              <h3 className="text-lg sm:text-xl font-bold">{t.hours.title}</h3>
            </div>
            <div className="divide-y">
              {schedule.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-4 sm:p-5 md:p-6 transition-colors hover:bg-secondary">
                  <span className="font-semibold text-sm sm:text-base text-foreground">{item.day}</span>
                  <span className={`font-medium text-sm sm:text-base ${item.available ? "text-primary" : "text-muted-foreground"}`}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 p-4 sm:p-5 md:p-6 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-primary">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-semibold text-sm sm:text-base">{t.hours.emergency}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
