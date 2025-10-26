import { TreeDiagram } from "@/components/tree-diagram"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DiagramPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Asistente
            </Button>
          </Link>
        </div>
        <TreeDiagram />
      </div>
    </main>
  )
}
