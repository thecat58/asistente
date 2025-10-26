"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TreeNodeProps {
  name: string
  description: string
  level: number
  children?: { condition: string; node: TreeNodeProps }[]
  hasRecommendations?: boolean
}

function TreeNode({ name, description, level, children, hasRecommendations }: TreeNodeProps) {
  const levelColors = [
    "border-blue-500 bg-blue-500/10",
    "border-purple-500 bg-purple-500/10",
    "border-green-500 bg-green-500/10",
    "border-orange-500 bg-orange-500/10",
  ]

  const color = levelColors[level % levelColors.length]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        </div>
        <Card className={`flex-1 p-4 border-2 ${color}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            {hasRecommendations && (
              <Badge variant="secondary" className="flex-shrink-0">
                Recomendaciones
              </Badge>
            )}
          </div>
        </Card>
      </div>

      {children && children.length > 0 && (
        <div className="ml-8 pl-4 border-l-2 border-border space-y-4">
          {children.map((child, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium">{child.condition}</span>
              </div>
              <TreeNode {...child.node} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function TreeDiagram() {
  // Estructura del árbol de decisión
  const treeData: TreeNodeProps = {
    name: "Inicio",
    description: "Árbol de decisión para selección de tecnologías",
    level: 0,
    children: [
      {
        condition: "Aplicación Web",
        node: {
          name: "Web Application",
          description: "Aplicaciones web modernas",
          level: 1,
          children: [
            {
              condition: "Timeline: Rápido",
              node: {
                name: "Desarrollo Rápido",
                description: "MVP y prototipos",
                level: 2,
                children: [
                  {
                    condition: "Complejidad: Simple",
                    node: {
                      name: "Web Simple Rápida",
                      description: "Next.js + Tailwind + Supabase",
                      level: 3,
                      hasRecommendations: true,
                    },
                  },
                  {
                    condition: "Complejidad: Compleja",
                    node: {
                      name: "Web Compleja Rápida",
                      description: "Next.js + TypeScript + tRPC + Prisma",
                      level: 3,
                      hasRecommendations: true,
                    },
                  },
                ],
              },
            },
            {
              condition: "Timeline: Normal",
              node: {
                name: "Desarrollo Normal",
                description: "Proyectos con timeline estándar",
                level: 2,
                children: [
                  {
                    condition: "Escala: Media",
                    node: {
                      name: "Web Escala Media",
                      description: "Next.js + TypeScript + PostgreSQL + Zustand",
                      level: 3,
                      hasRecommendations: true,
                    },
                  },
                ],
              },
            },
            {
              condition: "Timeline: Largo",
              node: {
                name: "Desarrollo Largo",
                description: "Proyectos enterprise",
                level: 2,
                children: [
                  {
                    condition: "Escala: Grande",
                    node: {
                      name: "Web Enterprise",
                      description: "Next.js + NestJS + PostgreSQL + Redis + GraphQL",
                      level: 3,
                      hasRecommendations: true,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        condition: "Aplicación Móvil",
        node: {
          name: "Mobile Application",
          description: "Aplicaciones móviles nativas y cross-platform",
          level: 1,
          children: [
            {
              condition: "Presupuesto: Mínimo",
              node: {
                name: "Mobile Low Budget",
                description: "React Native + Expo + Firebase",
                level: 2,
                hasRecommendations: true,
              },
            },
            {
              condition: "Presupuesto: Alto",
              node: {
                name: "Mobile High Budget",
                description: "Swift/Kotlin + React Native + GraphQL",
                level: 2,
                hasRecommendations: true,
              },
            },
          ],
        },
      },
      {
        condition: "API/Backend",
        node: {
          name: "Backend Service",
          description: "Servicios backend y APIs",
          level: 1,
          children: [
            {
              condition: "Escala: Pequeña",
              node: {
                name: "API Pequeña",
                description: "Node.js + Express + PostgreSQL",
                level: 2,
                hasRecommendations: true,
              },
            },
            {
              condition: "Escala: Muy Grande",
              node: {
                name: "API Enterprise",
                description: "Microservicios + Go + Kafka + Kubernetes",
                level: 2,
                hasRecommendations: true,
              },
            },
          ],
        },
      },
      {
        condition: "Aplicación Desktop",
        node: {
          name: "Desktop Application",
          description: "Aplicaciones de escritorio",
          level: 1,
          children: [
            {
              condition: "Complejidad: Simple",
              node: {
                name: "Desktop Simple",
                description: "Electron + React + TypeScript",
                level: 2,
                hasRecommendations: true,
              },
            },
            {
              condition: "Complejidad: Compleja",
              node: {
                name: "Desktop Compleja",
                description: "Tauri + Rust + React/Vue",
                level: 2,
                hasRecommendations: true,
              },
            },
          ],
        },
      },
      {
        condition: "Full-Stack",
        node: {
          name: "Full-Stack Application",
          description: "Aplicaciones completas frontend + backend",
          level: 1,
          children: [
            {
              condition: "Equipo: Solo",
              node: {
                name: "Full-Stack Solo",
                description: "Next.js + Prisma + Vercel",
                level: 2,
                hasRecommendations: true,
              },
            },
            {
              condition: "Equipo: Grande",
              node: {
                name: "Full-Stack Enterprise",
                description: "Turborepo + NestJS + Kubernetes",
                level: 2,
                hasRecommendations: true,
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Árbol de Decisión</h2>
        <p className="text-muted-foreground">
          Visualización completa del árbol de decisión para selección de tecnologías
        </p>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <TreeNode {...treeData} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Niveles del Árbol</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Nivel 1: Tipo de aplicación</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Nivel 2: Timeline / Presupuesto / Equipo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Nivel 3: Complejidad / Escala</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>Nivel 4: Recomendaciones finales</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Cómo Funciona</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• El árbol evalúa tus respuestas en orden de prioridad</li>
            <li>• Cada rama representa una decisión basada en tus necesidades</li>
            <li>• Los nodos con badge contienen recomendaciones específicas</li>
            <li>• El camino se construye dinámicamente según tus respuestas</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
