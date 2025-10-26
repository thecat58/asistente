"use client"

import { Card } from "@/components/ui/card"
import type { Question, Answer } from "@/lib/questions"
import { CheckCircle2 } from "lucide-react"

interface QuestionStepProps {
  question: Question
  onAnswer: (answer: Answer) => void
  stepNumber: number
}

export function QuestionStep({ question, onAnswer, stepNumber }: QuestionStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
            {stepNumber}
          </span>
          {question.category}
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-balance leading-tight">{question.text}</h2>
        {question.description && <p className="text-lg text-muted-foreground text-pretty">{question.description}</p>}
      </div>

      <div className="grid gap-3 md:gap-4">
        {question.options.map((option, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 cursor-pointer"
            onClick={() => onAnswer({ questionId: question.id, value: option.value })}
          >
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{option.label}</h3>
                  {option.description && (
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{option.description}</p>
                  )}
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
