import { type NextRequest, NextResponse } from "next/server"
import { DecisionTree } from "@/lib/decision-tree"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Recommendations API called")

    const answers = await request.json()
    console.log("[v0] Received answers:", JSON.stringify(answers))

    const tree = new DecisionTree()
    const result = tree.traverse(answers)

    console.log("[v0] Generated recommendations:", JSON.stringify(result))

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error in recommendations API:", error)
    return NextResponse.json(
      {
        error: "Error al generar recomendaciones",
        summary: "Ocurrió un error al procesar tu solicitud",
        technologies: {},
        considerations: [],
      },
      { status: 500 },
    )
  }
}
