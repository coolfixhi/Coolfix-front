"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Snowflake, Wrench, Factory, Home, ChevronRight } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface ServicesSectionProps {
  t: TranslationKey
}

const appliancesByCategory = {
  commercial: [
    { name: "Heladeras Comerciales", image: "/commercial-refrigerator.png" },
    { name: "Heladoras Horizontal", image: "/horizontal-freezer.jpg" },
    { name: "Heladoras Vertical", image: "/vertical-freezer.jpg" },
    { name: "Vitrinas Refrigeradas", image: "/display-cooler.jpg" },
  ],
  domestic: [
    { name: "Lavadoras", image: "/modern-washing-machine.png" },
    { name: "Secadoras", image: "/dryer-machine.jpg" },
    { name: "Refrigeradores", image: "/home-refrigerator.jpg" },
    { name: "Cocinas", image: "/kitchen-stove.png" },
    { name: "Campanas Extractoras", image: "/range-hood.jpg" },
    { name: "Trituradoras", image: "/garbage-disposal.png" },
  ],
  industrial: [
    { name: "Cámaras Frías", image: "/cold-room-industrial.jpg" },
    { name: "Sistemas de Refrigeración", image: "/refrigeration-system.jpg" },
    { name: "Congeladores Industriales", image: "/industrial-freezer.jpg" },
    { name: "Equipos de Climatización", image: "/hvac-equipment.png" },
  ],
  preventive: [
    { name: "Inspección General", image: "/equipment-inspection.jpg" },
    { name: "Limpieza de Sistemas", image: "/system-cleaning.jpg" },
    { name: "Revisión de Componentes", image: "/component-check.jpg" },
    { name: "Calibración", image: "/equipment-calibration.jpg" },
  ],
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("commercial")

  const serviceCategories = [
    {
      id: "commercial",
      title: t.services.commercial.title,
      description: t.services.commercial.description,
      icon: Factory,
      color: "bg-blue-500",
    },
    {
      id: "domestic",
      title: t.services.domestic.title,
      description: t.services.domestic.description,
      icon: Home,
      color: "bg-blue-600",
    },
    {
      id: "industrial",
      title: t.services.industrial.title,
      description: t.services.industrial.description,
      icon: Snowflake,
      color: "bg-blue-700",
    },
    {
      id: "preventive",
      title: t.services.preventive.title,
      description: t.services.preventive.description,
      icon: Wrench,
      color: "bg-blue-800",
    },
  ]

  return (
    <section id="servicios" className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t.services.title}
          </h2>
          <p className="text-pretty text-base sm:text-lg text-muted-foreground">{t.services.subtitle}</p>
        </div>

        <div className="mb-10">
          <div className="relative mx-auto max-w-4xl">
            {/* Contenedor de tabs con fondo */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-1 rounded-xl bg-muted/50 p-1.5 sm:p-2 backdrop-blur-sm border border-border/50 shadow-inner">
              {serviceCategories.map((service, index) => {
                const isActive = selectedCategory === service.id
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedCategory(service.id)}
                    className={`
                      group relative flex items-center justify-center gap-2 sm:gap-2.5
                      px-4 sm:px-6 py-3 sm:py-3.5
                      rounded-lg font-semibold text-sm sm:text-base
                      transition-all duration-300 ease-out
                      w-full sm:w-auto sm:flex-1
                      overflow-hidden cursor-pointer
                      ${
                        isActive
                          ? "text-primary-foreground shadow-lg scale-[1.02]"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    {/* Fondo animado para el tab activo */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90 rounded-lg shadow-md opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" />
                    )}
                    
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
                    
                    {/* Contenido del tab */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
                      <service.icon 
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isActive 
                            ? "text-primary-foreground scale-110" 
                            : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                        }`} 
                      />
                      <span className="whitespace-nowrap">{service.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                          isActive 
                            ? "rotate-90 text-primary-foreground opacity-100" 
                            : "rotate-0 opacity-0 group-hover:opacity-50"
                        }`}
                      />
                    </div>
                    
                    {/* Indicador inferior animado */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-primary-foreground/30 rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Descripción de la categoría seleccionada */}
            <div className="mt-4 text-center">
              <p className="text-sm sm:text-base text-muted-foreground animate-[fadeInUp_0.4s_ease-out]">
                {serviceCategories.find((s) => s.id === selectedCategory)?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-xl">
          <h3 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold text-foreground">
            {serviceCategories.find((s) => s.id === selectedCategory)?.title}
          </h3>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {appliancesByCategory[selectedCategory as keyof typeof appliancesByCategory].map((appliance, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-lg"
                style={{
                  animation: "fadeInUp 0.5s ease-out",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={appliance.image || "/placeholder.svg"}
                    alt={appliance.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h4 className="text-balance font-semibold text-sm sm:text-base text-foreground group-hover:text-primary">
                    {appliance.name}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
