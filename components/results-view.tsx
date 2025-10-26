"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Answer } from "@/lib/questions"
import { Sparkles, RefreshCw, Code2, Database, Cloud, Wrench, Loader2, AlertCircle } from "lucide-react"

interface ResultsViewProps {
  answers: Answer[]
  onReset: () => void
  isLoading?: boolean
}

interface TechRecommendation {
  primary: string[]
  reasoning: string
  alternatives?: string[]
}

interface Recommendations {
  summary: string
  technologies: {
    frontend?: TechRecommendation
    backend?: TechRecommendation
    infrastructure?: TechRecommendation
    tools?: TechRecommendation
  }
  considerations: string[]
  decision_path?: string
  error?: string
}

export function ResultsView({ answers, onReset, isLoading = false }: ResultsViewProps) {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [loading, setLoading] = useState(isLoading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("[v0] Fetching recommendations from Python API...")
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] Recommendations received:", data)

        if (data.error) {
          setError(data.error)
        } else {
          setRecommendations(data)
        }
      } catch (err) {
        console.error("[v0] Error fetching recommendations:", err)
        setError("Error al generar recomendaciones. Por favor, intenta de nuevo.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [answers])

  const categoryIcons = {
    frontend: Code2,
    backend: Database,
    infrastructure: Cloud,
    tools: Wrench,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Analizando tus respuestas...</h2>
            <p className="text-muted-foreground">El árbol de decisión está procesando tu información</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !recommendations) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <div className="p-6 space-y-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Error al generar recomendaciones</h2>
              <p className="text-muted-foreground text-sm">{error || "Ocurrió un error inesperado"}</p>
            </div>
            <Button onClick={onReset} className="w-full">
              Intentar de nuevo
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold">Recomendaciones Tecnológicas</h1>
                <p className="text-sm text-muted-foreground">Stack personalizado para tu proyecto</p>
              </div>
            </div>
            <Button onClick={onReset} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva Consulta</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Summary Card */}
          <Card className="bg-gradient-to-br from-card to-muted/30 border-2">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-semibold">Stack Recomendado</h2>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{recommendations.summary}</p>
                  {recommendations.decision_path && (
                    <div className="pt-3 mt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Ruta de decisión:</span> {recommendations.decision_path}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Technology Recommendations */}
          <div className="space-y-6">
            {Object.entries(recommendations.technologies).map(([category, tech]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code2
              return (
                <Card key={category} className="overflow-hidden">
                  <div className="border-b border-border bg-muted/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold capitalize text-lg">
                        {category === "frontend" && "Frontend"}
                        {category === "backend" && "Backend"}
                        {category === "infrastructure" && "Infraestructura"}
                        {category === "tools" && "Herramientas"}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {tech.primary.map((item, idx) => (
                        <Badge key={idx} variant="default" className="px-3 py-1 text-sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.reasoning}</p>
                    {tech.alternatives && tech.alternatives.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Alternativas:</p>
                        <div className="flex flex-wrap gap-2">
                          {tech.alternatives.map((alt, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Additional Considerations */}
          {recommendations.considerations && recommendations.considerations.length > 0 && (
            <Card>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Consideraciones Adicionales</h3>
                <ul className="space-y-2">
                  {recommendations.considerations.map((consideration, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1 leading-relaxed">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onReset} size="lg" className="gap-2 flex-1">
              <RefreshCw className="h-4 w-4" />
              Hacer Nueva Consulta
            </Button>
            <Button variant="outline" size="lg" className="gap-2 flex-1 bg-transparent" onClick={() => window.print()}>
              Exportar Resultados
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
