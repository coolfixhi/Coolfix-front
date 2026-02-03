"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Snowflake, Wrench, Factory, Home, ChevronRight, Wind } from "lucide-react"
import type { TranslationKey } from "@/lib/translations"

interface ServicesSectionProps {
  t: TranslationKey
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("airConditioning")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const serviceCategories = [
    {
      id: "airConditioning",
      title: t.services.airConditioning.title,
      description: t.services.airConditioning.description,
      icon: Wind,
    },
    {
      id: "commercial",
      title: t.services.commercial.title,
      description: t.services.commercial.description,
      icon: Factory,
    },
    {
      id: "domestic",
      title: t.services.domestic.title,
      description: t.services.domestic.description,
      icon: Home,
    },
    {
      id: "industrial",
      title: t.services.industrial.title,
      description: t.services.industrial.description,
      icon: Snowflake,
    },
    {
      id: "preventive",
      title: t.services.preventive.title,
      description: t.services.preventive.description,
      icon: Wrench,
    },
  ]

  // Función para obtener todas las tarjetas a mostrar (sin subcategorías)
  const getDisplayServices = () => {
    if (selectedCategory === "airConditioning") {
      return [{
        id: "airConditioning",
        title: t.services.airConditioning.title,
        description: t.services.airConditioning.description,
        image: "/img/ULT.jpeg"
      }]
    }
    
    if (selectedCategory === "preventive") {
      // Para mantenimiento preventivo, mostrar todas las tarjetas existentes
      return t.services.preventive.items.map((item, index) => ({
        id: `preventive-${index}`,
        title: item.name,
        description: item.description,
        image: index === 0 ? "/img/MT1.jpeg" : 
               index === 1 ? "/img/MT3.jpeg" : 
               "/img/MT2.jpeg"
      }))
    }

    // Para Línea Comercial, mostrar todas las subcategorías
    if (selectedCategory === "commercial") {
      return [
        {
          id: "commercial-neveras",
          title: t.services.commercial.display.neveras.title,
          description: t.services.commercial.display.neveras.description,
          image: "/img/LC1.jpeg"
        },
        {
          id: "commercial-dispensadores",
          title: t.services.commercial.display.dispensadores.title,
          description: t.services.commercial.display.dispensadores.description,
          image: "/img/LC2.jpeg"
        },
        {
          id: "commercial-bebidas",
          title: t.services.commercial.display.bebidas.title,
          description: t.services.commercial.display.bebidas.description,
          image: "/img/LC3.jpeg"
        }
      ]
    }

    // Para Línea Doméstica, mostrar todas las subcategorías
    if (selectedCategory === "domestic") {
      return [
        {
          id: "domestic-kitchen",
          title: t.services.domestic.kitchen.title,
          description: t.services.domestic.kitchen.description,
          image: "/img/LD2.jpeg"
        },
        {
          id: "domestic-gas",
          title: t.services.domestic.gas.title,
          description: t.services.domestic.gas.description,
          image: "/img/LD4.jpeg"
        },
        {
          id: "domestic-laundry",
          title: t.services.domestic.laundry.title,
          description: t.services.domestic.laundry.description,
          image: "/img/LD1.jpeg"
        },
        {
          id: "domestic-refrigeration",
          title: t.services.domestic.refrigeration.title,
          description: t.services.domestic.refrigeration.description,
          image: "/img/LD3.jpeg"
        }
      ]
    }

    // Para Línea Industrial, mostrar todas las subcategorías
    if (selectedCategory === "industrial") {
      return [
        {
          id: "industrial-laundry",
          title: t.services.industrial.laundry.title,
          description: t.services.industrial.laundry.description,
          image: "/img/LI1.jpeg"
        },
        {
          id: "industrial-refrigeration",
          title: t.services.industrial.refrigeration.title,
          description: t.services.industrial.refrigeration.description,
          image: "/img/LI2.jpeg"
        }
      ]
    }

    return []
  }

  const getCurrentTitle = () => {
    const category = serviceCategories.find((c) => c.id === selectedCategory)
    return category?.title || ""
  }

  const getCurrentDescription = () => {
    const category = serviceCategories.find((c) => c.id === selectedCategory)
    return category?.description || ""
  }

  const displayServices = getDisplayServices()

  return (
    <section id="servicios" className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t.services.title}
          </h2>
          <p className="text-pretty text-sm sm:text-base md:text-lg text-muted-foreground px-2">{t.services.subtitle}</p>
        </div>

        <div className="mb-8 sm:mb-10">
          <div className="relative mx-auto max-w-5xl px-2 sm:px-4">
            {/* Contenedor de tabs principales con scroll horizontal en móviles */}
            <div className="relative overflow-x-auto overflow-y-hidden -mx-2 sm:mx-0 px-2 sm:px-0">
              <div className="relative flex flex-nowrap items-center justify-start sm:justify-center gap-1 sm:gap-1.5 rounded-lg bg-background/80 p-1 sm:p-1.5 border border-border/40 shadow-sm min-w-max sm:min-w-0">
                {serviceCategories.map((service, index) => {
                  const isActive = selectedCategory === service.id
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedCategory(service.id)}
                      className={`
                        group relative flex items-center justify-center gap-1 sm:gap-1.5
                        px-2 sm:px-3 py-1.5 sm:py-2
                        rounded-md font-medium text-[10px] sm:text-xs md:text-sm
                        transition-all duration-300 ease-out
                        shrink-0
                        overflow-hidden cursor-pointer
                        whitespace-nowrap
                        ${
                          isActive
                            ? "text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                      }}
                    >
                      {/* Fondo animado para el tab activo */}
                      {isActive && (
                        <div className="absolute inset-0 bg-primary rounded-md shadow-sm" />
                      )}
                      
                      {/* Contenido del tab */}
                      <div className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                        <service.icon 
                          className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 transition-all duration-300 ${
                            isActive 
                              ? "text-primary-foreground" 
                              : "text-muted-foreground group-hover:text-foreground"
                          }`} 
                        />
                        <span className="hidden sm:inline">{service.title}</span>
                        <span className="sm:hidden">{service.title.split(' ')[0]}</span>
                        {isActive && (
                          <ChevronRight
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-primary-foreground rotate-90 opacity-70 hidden sm:block"
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Descripción de la categoría seleccionada */}
            <div className="mt-3 sm:mt-4 text-center px-2 sm:px-0">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground animate-[fadeInUp_0.4s_ease-out]">
                {getCurrentDescription()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 lg:p-8 shadow-xl">
          <h3 className="mb-4 sm:mb-6 md:mb-8 text-center text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {getCurrentTitle()}
          </h3>
          <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayServices.map((service, index) => {
              const isHovered = hoveredItem === index
              return (
                <Card
                  key={service.id}
                  className="group cursor-pointer overflow-visible border-2 transition-all duration-300 hover:border-primary hover:shadow-lg"
                  style={{
                    animation: "fadeInUp 0.5s ease-out",
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-2 sm:p-3 md:p-4 text-center">
                    <h4 className="text-balance font-semibold text-xs sm:text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1 sm:mb-2">
                      {service.title}
                    </h4>
                    {/* Texto descriptivo que aparece debajo de la imagen */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isHovered ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}
                      `}
                    >
                      <p className="text-sm text-muted-foreground text-left leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
