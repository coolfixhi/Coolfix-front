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
    <section id="horario" className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">{t.hours.title}</h2>
          <p className="text-pretty text-lg text-muted-foreground">{t.hours.subtitle}</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="overflow-hidden border-2">
            <div className="bg-primary p-6 text-center text-white">
              <Clock className="mx-auto mb-3 h-12 w-12" />
              <h3 className="text-xl font-bold">{t.hours.title}</h3>
            </div>
            <div className="divide-y">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-6 transition-colors hover:bg-secondary">
                  <span className="font-semibold text-foreground">{item.day}</span>
                  <span className={`font-medium ${item.available ? "text-primary" : "text-muted-foreground"}`}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">{t.hours.emergency}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
