"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sparkles, GitBranch } from "lucide-react"
import { QuestionStep } from "./question-step"
import { ResultsView } from "./results-view"
import { questions, type Answer } from "@/lib/questions"
import Link from "next/link"

export function TechSelector() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = async (answer: Answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers([])
    setShowResults(false)
    setIsLoading(false) // Reset loading state
  }

  if (showResults) {
    return <ResultsView answers={answers} onReset={handleReset} isLoading={isLoading} />
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-balance">Asistente de Selección Tecnológica</h1>
                <p className="text-sm text-muted-foreground">Encuentra el stack perfecto para tu proyecto</p>
              </div>
            </div>
            <Link href="/diagram">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <GitBranch className="h-4 w-4" />
                <span className="hidden sm:inline">Ver Árbol</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Paso {currentStep + 1} de {questions.length}
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <QuestionStep question={questions[currentStep]} onAnswer={handleAnswer} stepNumber={currentStep + 1} />

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Herramienta de ayuda para la toma de decisiones tecnológicas
          </p>
        </div>
      </footer>
    </div>
  )
}
