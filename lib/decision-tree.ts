/**
 * Árbol de Decisión para Selección de Tecnologías
 * Implementación en TypeScript del árbol de decisión
 */

interface TechRecommendation {
  primary: string[]
  reasoning: string
  alternatives: string[]
}

interface Recommendations {
  frontend?: TechRecommendation
  backend?: TechRecommendation
  infrastructure?: TechRecommendation
  tools?: TechRecommendation
}

interface Answer {
  questionId: string
  value: string
}

interface DecisionResult {
  summary: string
  technologies: Recommendations
  considerations: string[]
  decision_path: string
}

class TechNode {
  name: string
  description: string
  children: Map<string, TechNode>
  recommendations: Recommendations | null

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
    this.children = new Map()
    this.recommendations = null
  }

  addChild(condition: string, node: TechNode): TechNode {
    this.children.set(condition, node)
    return node
  }

  setRecommendations(recommendations: Recommendations): void {
    this.recommendations = recommendations
  }
}

export class DecisionTree {
  private root: TechNode

  constructor() {
    this.root = this.buildTree()
  }

  private buildTree(): TechNode {
    const root = new TechNode("root", "Inicio del árbol de decisión")

    // Nivel 1: Tipo de aplicación
    const webNode = root.addChild("web", new TechNode("web", "Aplicación Web"))
    const mobileNode = root.addChild("mobile", new TechNode("mobile", "Aplicación Móvil"))
    const apiNode = root.addChild("api", new TechNode("api", "API/Backend"))
    const desktopNode = root.addChild("desktop", new TechNode("desktop", "Aplicación de Escritorio"))
    const fullstackNode = root.addChild("fullstack", new TechNode("fullstack", "Full-Stack"))

    // Construir ramas
    this.buildWebBranch(webNode)
    this.buildMobileBranch(mobileNode)
    this.buildApiBranch(apiNode)
    this.buildDesktopBranch(desktopNode)
    this.buildFullstackBranch(fullstackNode)

    return root
  }

  private buildWebBranch(node: TechNode): void {
    // Nivel 2: Timeline
    const fastNode = node.addChild("fast", new TechNode("fast", "Desarrollo rápido"))
    const normalNode = node.addChild("normal", new TechNode("normal", "Timeline normal"))
    const longNode = node.addChild("long", new TechNode("long", "Timeline largo"))

    // Fast + Simple
    const fastSimple = fastNode.addChild("simple", new TechNode("simple", "Complejidad simple"))
    fastSimple.setRecommendations({
      frontend: {
        primary: ["Next.js", "React", "Tailwind CSS"],
        reasoning: "Stack rápido y productivo para MVPs y prototipos con SSR/SSG integrado",
        alternatives: ["Astro", "Remix", "SvelteKit"],
      },
      backend: {
        primary: ["Next.js API Routes", "Supabase"],
        reasoning: "Backend integrado sin configuración adicional, ideal para desarrollo rápido",
        alternatives: ["Firebase", "Vercel Postgres"],
      },
      infrastructure: {
        primary: ["Vercel", "Cloudflare"],
        reasoning: "Deploy automático y CDN global sin configuración",
        alternatives: ["Netlify", "Railway"],
      },
      tools: {
        primary: ["GitHub", "VS Code", "Vercel CLI"],
        reasoning: "Herramientas esenciales para desarrollo ágil",
        alternatives: ["GitLab", "Cursor"],
      },
    })

    // Fast + Complex
    const fastComplex = fastNode.addChild("complex", new TechNode("complex", "Complejidad alta"))
    fastComplex.setRecommendations({
      frontend: {
        primary: ["Next.js", "TypeScript", "React Query"],
        reasoning: "Stack moderno con type safety para desarrollo rápido pero robusto",
        alternatives: ["Remix", "SvelteKit"],
      },
      backend: {
        primary: ["Next.js", "tRPC", "Prisma", "PostgreSQL"],
        reasoning: "Type-safe end-to-end con ORM moderno para desarrollo rápido",
        alternatives: ["NestJS", "Fastify"],
      },
      infrastructure: {
        primary: ["Vercel", "Supabase", "Upstash"],
        reasoning: "Servicios managed para enfocarse en features, no en infraestructura",
        alternatives: ["Railway", "PlanetScale"],
      },
      tools: {
        primary: ["GitHub", "Linear", "Sentry"],
        reasoning: "Herramientas para gestión ágil y monitoreo de errores",
        alternatives: ["GitLab", "Jira", "Rollbar"],
      },
    })

    // Normal + Medium Scale
    const normalMedium = normalNode.addChild("medium", new TechNode("medium", "Escala media"))
    normalMedium.setRecommendations({
      frontend: {
        primary: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
        reasoning: "Stack equilibrado con gestión de estado para aplicaciones de escala media",
        alternatives: ["Remix", "Vue.js + Nuxt"],
      },
      backend: {
        primary: ["Node.js", "Express", "PostgreSQL", "Prisma"],
        reasoning: "Backend escalable con ORM type-safe y base de datos robusta",
        alternatives: ["NestJS", "Fastify", "Drizzle"],
      },
      infrastructure: {
        primary: ["Vercel", "Railway", "Cloudflare", "Upstash"],
        reasoning: "Infraestructura managed con buen balance costo-rendimiento",
        alternatives: ["Fly.io", "Render", "DigitalOcean"],
      },
      tools: {
        primary: ["GitHub", "Linear", "Sentry", "GitHub Actions"],
        reasoning: "Suite completa para colaboración y CI/CD",
        alternatives: ["GitLab", "Notion", "CircleCI"],
      },
    })

    // Long + Large Scale
    const longLarge = longNode.addChild("large", new TechNode("large", "Escala grande"))
    longLarge.setRecommendations({
      frontend: {
        primary: ["Next.js", "TypeScript", "React Query", "Zustand", "Tailwind CSS"],
        reasoning: "Stack enterprise con gestión de estado avanzada y caching optimizado",
        alternatives: ["Remix", "Angular"],
      },
      backend: {
        primary: ["Node.js", "NestJS", "PostgreSQL", "Redis", "GraphQL"],
        reasoning: "Arquitectura escalable con caching, API flexible y microservicios",
        alternatives: ["Go", "Java Spring Boot"],
      },
      infrastructure: {
        primary: ["AWS", "Kubernetes", "Terraform", "CloudFlare"],
        reasoning: "Infraestructura enterprise con auto-scaling y multi-región",
        alternatives: ["Google Cloud", "Azure"],
      },
      tools: {
        primary: ["GitHub", "Linear", "Datadog", "Sentry", "GitHub Actions"],
        reasoning: "Herramientas enterprise para observabilidad y colaboración",
        alternatives: ["GitLab", "Jira", "New Relic"],
      },
    })
  }

  private buildMobileBranch(node: TechNode): void {
    // Budget-based decisions
    const minimalNode = node.addChild("minimal", new TechNode("minimal", "Presupuesto mínimo"))
    minimalNode.setRecommendations({
      frontend: {
        primary: ["React Native", "Expo"],
        reasoning: "Desarrollo cross-platform eficiente con una sola base de código",
        alternatives: ["Flutter", "Ionic"],
      },
      backend: {
        primary: ["Firebase", "Supabase"],
        reasoning: "Backend-as-a-Service gratuito con auth y database incluidos",
        alternatives: ["AWS Amplify", "Appwrite"],
      },
      infrastructure: {
        primary: ["Firebase Hosting", "Expo EAS"],
        reasoning: "Hosting y build service gratuitos para apps móviles",
        alternatives: ["Vercel", "Netlify"],
      },
      tools: {
        primary: ["GitHub", "Expo Go", "React Native Debugger"],
        reasoning: "Herramientas gratuitas para desarrollo móvil",
        alternatives: ["GitLab", "Flipper"],
      },
    })

    const highBudget = node.addChild("high", new TechNode("high", "Presupuesto alto"))
    highBudget.setRecommendations({
      frontend: {
        primary: ["Swift (iOS)", "Kotlin (Android)", "React Native"],
        reasoning: "Desarrollo nativo para máximo rendimiento con código compartido",
        alternatives: ["Flutter", "Native completo"],
      },
      backend: {
        primary: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
        reasoning: "Backend robusto y escalable para apps de producción",
        alternatives: ["Go", "AWS AppSync"],
      },
      infrastructure: {
        primary: ["AWS", "Fastly", "CloudFlare"],
        reasoning: "Infraestructura premium con CDN global y baja latencia",
        alternatives: ["Google Cloud", "Azure"],
      },
      tools: {
        primary: ["GitHub", "Fastlane", "Firebase Crashlytics", "TestFlight"],
        reasoning: "Suite completa para CI/CD y distribución de apps",
        alternatives: ["GitLab", "Bitrise", "App Center"],
      },
    })
  }

  private buildApiBranch(node: TechNode): void {
    // Scale-based decisions
    const smallScale = node.addChild("small", new TechNode("small", "Escala pequeña"))
    smallScale.setRecommendations({
      backend: {
        primary: ["Node.js", "Express", "PostgreSQL"],
        reasoning: "Stack simple y efectivo para APIs de escala pequeña",
        alternatives: ["Python + FastAPI", "Go + Gin"],
      },
      infrastructure: {
        primary: ["Railway", "Render", "Supabase"],
        reasoning: "Hosting económico con base de datos incluida",
        alternatives: ["Fly.io", "DigitalOcean"],
      },
      tools: {
        primary: ["GitHub", "Postman", "Sentry"],
        reasoning: "Herramientas básicas para desarrollo y testing de APIs",
        alternatives: ["GitLab", "Insomnia", "Rollbar"],
      },
    })

    const xlargeScale = node.addChild("xlarge", new TechNode("xlarge", "Escala muy grande"))
    xlargeScale.setRecommendations({
      backend: {
        primary: ["Microservicios", "Go", "Kafka", "PostgreSQL", "Redis", "gRPC"],
        reasoning: "Arquitectura distribuida para escala masiva con event streaming",
        alternatives: ["Java Spring Boot", "Rust", "RabbitMQ"],
      },
      infrastructure: {
        primary: ["Kubernetes", "AWS", "Terraform", "Service Mesh"],
        reasoning: "Orquestación de contenedores y IaC para sistemas distribuidos",
        alternatives: ["Google Cloud", "Azure", "Nomad"],
      },
      tools: {
        primary: ["GitHub", "Datadog", "PagerDuty", "ArgoCD"],
        reasoning: "Observabilidad y deployment continuo para microservicios",
        alternatives: ["GitLab", "New Relic", "Spinnaker"],
      },
    })
  }

  private buildDesktopBranch(node: TechNode): void {
    const simpleNode = node.addChild("simple", new TechNode("simple", "App simple"))
    simpleNode.setRecommendations({
      frontend: {
        primary: ["Electron", "React", "TypeScript"],
        reasoning: "Desarrollo cross-platform con tecnologías web familiares",
        alternatives: ["Tauri", "Flutter Desktop"],
      },
      infrastructure: {
        primary: ["GitHub Releases", "Electron Builder"],
        reasoning: "Distribución automática de binarios para múltiples plataformas",
        alternatives: ["S3 + CloudFront", "Snapcraft"],
      },
      tools: {
        primary: ["GitHub", "Electron Forge", "VS Code"],
        reasoning: "Herramientas para desarrollo y empaquetado de apps desktop",
        alternatives: ["GitLab", "electron-builder"],
      },
    })

    const complexNode = node.addChild("complex", new TechNode("complex", "App compleja"))
    complexNode.setRecommendations({
      frontend: {
        primary: ["Tauri", "Rust", "React/Vue"],
        reasoning: "Rendimiento nativo con menor footprint que Electron",
        alternatives: ["Qt", "Native (C++/Swift/Kotlin)"],
      },
      infrastructure: {
        primary: ["GitHub Actions", "Code Signing", "Auto-updater"],
        reasoning: "CI/CD completo con firma de código y actualizaciones automáticas",
        alternatives: ["GitLab CI", "AppCenter"],
      },
      tools: {
        primary: ["GitHub", "Rust Analyzer", "cargo"],
        reasoning: "Toolchain completo para desarrollo con Rust",
        alternatives: ["GitLab", "CLion"],
      },
    })
  }

  private buildFullstackBranch(node: TechNode): void {
    const soloNode = node.addChild("solo", new TechNode("solo", "Desarrollador solo"))
    soloNode.setRecommendations({
      frontend: {
        primary: ["Next.js", "React", "Tailwind CSS"],
        reasoning: "Framework all-in-one que reduce decisiones y configuración",
        alternatives: ["Remix", "SvelteKit"],
      },
      backend: {
        primary: ["Next.js API Routes", "Prisma", "PostgreSQL"],
        reasoning: "Backend integrado con ORM type-safe, todo en un proyecto",
        alternatives: ["Supabase", "Firebase"],
      },
      infrastructure: {
        primary: ["Vercel", "Supabase", "Cloudflare"],
        reasoning: "Deploy con un click y servicios managed sin DevOps",
        alternatives: ["Netlify", "Railway"],
      },
      tools: {
        primary: ["GitHub", "VS Code", "Vercel CLI"],
        reasoning: "Herramientas simples y productivas para desarrollo individual",
        alternatives: ["GitLab", "Cursor"],
      },
    })

    const largeTeam = node.addChild("large", new TechNode("large", "Equipo grande"))
    largeTeam.setRecommendations({
      frontend: {
        primary: ["Next.js", "TypeScript", "Turborepo", "Tailwind CSS"],
        reasoning: "Monorepo con múltiples apps y packages compartidos",
        alternatives: ["Nx", "Lerna"],
      },
      backend: {
        primary: ["NestJS", "GraphQL", "PostgreSQL", "Redis", "Microservicios"],
        reasoning: "Arquitectura modular y escalable para equipos grandes",
        alternatives: ["tRPC", "Go microservices"],
      },
      infrastructure: {
        primary: ["Kubernetes", "AWS", "Terraform", "ArgoCD"],
        reasoning: "Infraestructura enterprise con GitOps y multi-ambiente",
        alternatives: ["Google Cloud", "Azure", "Pulumi"],
      },
      tools: {
        primary: ["GitHub", "Linear", "Datadog", "Sentry", "Figma"],
        reasoning: "Suite enterprise para colaboración, monitoreo y diseño",
        alternatives: ["GitLab", "Jira", "New Relic"],
      },
    })
  }

  public traverse(answers: Answer[]): DecisionResult {
    // Convertir array de respuestas a Map
    const answersMap = new Map<string, string>()
    answers.forEach((answer) => {
      answersMap.set(answer.questionId, answer.value)
    })

    let current = this.root
    const path: string[] = []

    // Orden de prioridad para recorrer el árbol
    const priorityOrder = [
      "app-type", // Nivel 1: Tipo de aplicación
      "timeline", // Nivel 2: Timeline
      "complexity", // Nivel 3: Complejidad
      "scale", // Nivel 3: Escala
      "budget", // Nivel 2: Presupuesto (para mobile)
      "team-size", // Nivel 2: Tamaño de equipo (para fullstack)
    ]

    // Recorrer el árbol según las respuestas
    for (const key of priorityOrder) {
      const value = answersMap.get(key)
      if (!value) continue

      const child = current.children.get(value)
      if (child) {
        current = child
        path.push(`${key}=${value}`)
      }

      // Si llegamos a un nodo con recomendaciones, retornar
      if (current.recommendations) {
        return this.formatRecommendations(current.recommendations, answersMap, path)
      }
    }

    // Si no encontramos recomendaciones específicas, usar por defecto
    return this.getDefaultRecommendations(answersMap)
  }

  private formatRecommendations(
    recommendations: Recommendations,
    answers: Map<string, string>,
    path: string[],
  ): DecisionResult {
    return {
      summary: this.generateSummary(answers),
      technologies: recommendations,
      considerations: this.generateConsiderations(answers),
      decision_path: path.join(" → "),
    }
  }

  private generateSummary(answers: Map<string, string>): string {
    const appType = answers.get("app-type") || "aplicación"
    const scale = answers.get("scale") || ""
    const timeline = answers.get("timeline") || ""

    const parts: string[] = []

    const typeMap: Record<string, string> = {
      web: "una aplicación web moderna",
      mobile: "una aplicación móvil",
      api: "un servicio backend/API",
      desktop: "una aplicación de escritorio",
      fullstack: "una aplicación full-stack",
    }
    parts.push(typeMap[appType] || "una aplicación")

    if (scale === "large" || scale === "xlarge") {
      parts.push("con alta escalabilidad")
    } else if (scale === "small") {
      parts.push("con escala pequeña")
    }

    if (timeline === "fast") {
      parts.push("y desarrollo rápido")
    }

    return `Basado en tus respuestas, recomendamos un stack para ${parts.join(", ")}. Las tecnologías seleccionadas equilibran rendimiento, productividad y mantenibilidad.`
  }

  private generateConsiderations(answers: Map<string, string>): string[] {
    const considerations: string[] = []

    const audience = answers.get("audience")
    const scale = answers.get("scale")
    const complexity = answers.get("complexity")
    const teamSize = answers.get("team-size")
    const appType = answers.get("app-type")

    if (audience === "public") {
      considerations.push("Implementa medidas de seguridad robustas (rate limiting, validación de inputs, HTTPS)")
      considerations.push("Considera SEO y accesibilidad desde el inicio")
    }

    if (audience === "internal") {
      considerations.push("Integra con sistemas de autenticación corporativos (SSO, LDAP)")
    }

    if (scale === "large" || scale === "xlarge") {
      considerations.push("Planifica estrategia de caching y CDN desde el inicio")
      considerations.push("Implementa monitoreo y observabilidad comprehensivos")
      considerations.push("Considera arquitectura multi-región para latencia global")
    }

    if (complexity === "complex" || complexity === "very-complex") {
      considerations.push("Documenta arquitectura y decisiones técnicas detalladamente")
      considerations.push("Implementa testing comprehensivo (unit, integration, e2e)")
      considerations.push("Establece prácticas de code review y CI/CD desde el inicio")
    }

    if (teamSize === "large") {
      considerations.push("Define convenciones de código y guías de estilo claras")
      considerations.push("Implementa monorepo si tienes múltiples proyectos relacionados")
    }

    if (appType === "mobile") {
      considerations.push("Planifica estrategia de actualizaciones y versionado de app")
      considerations.push("Considera offline-first architecture para mejor UX")
    }

    return considerations
  }

  private getDefaultRecommendations(answers: Map<string, string>): DecisionResult {
    return {
      summary: "Recomendaciones generales basadas en tus respuestas.",
      technologies: {
        frontend: {
          primary: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
          reasoning: "Stack moderno y versátil para la mayoría de proyectos",
          alternatives: ["Remix", "SvelteKit", "Vue.js"],
        },
        backend: {
          primary: ["Node.js", "Express", "PostgreSQL"],
          reasoning: "Backend confiable y ampliamente adoptado",
          alternatives: ["NestJS", "Fastify", "Python + FastAPI"],
        },
        infrastructure: {
          primary: ["Vercel", "Railway", "Cloudflare"],
          reasoning: "Infraestructura managed con buen balance",
          alternatives: ["Netlify", "Render", "DigitalOcean"],
        },
        tools: {
          primary: ["GitHub", "VS Code", "Linear"],
          reasoning: "Herramientas estándar de la industria",
          alternatives: ["GitLab", "Cursor", "Notion"],
        },
      },
      considerations: this.generateConsiderations(answers),
      decision_path: "default",
    }
  }
}
