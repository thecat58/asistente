import type { Answer } from "./questions"

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
}

export function generateRecommendations(answers: Answer[]): Recommendations {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]))

  const appType = answerMap.get("app-type")
  const audience = answerMap.get("audience")
  const scale = answerMap.get("scale")
  const budget = answerMap.get("budget")
  const teamSize = answerMap.get("team-size")
  const timeline = answerMap.get("timeline")
  const complexity = answerMap.get("complexity")

  const recommendations: Recommendations = {
    summary: "",
    technologies: {},
    considerations: [],
  }

  // Frontend recommendations
  if (appType === "web" || appType === "fullstack") {
    if (timeline === "fast" || teamSize === "solo") {
      recommendations.technologies.frontend = {
        primary: ["Next.js", "React", "Tailwind CSS"],
        reasoning:
          "Next.js ofrece un desarrollo rápido con SSR/SSG integrado, React es ampliamente adoptado, y Tailwind CSS acelera el desarrollo de UI.",
        alternatives: ["Remix", "Astro", "SvelteKit"],
      }
    } else if (complexity === "complex" || complexity === "very-complex") {
      recommendations.technologies.frontend = {
        primary: ["Next.js", "TypeScript", "React Query", "Zustand"],
        reasoning: "Stack robusto para aplicaciones complejas con gestión de estado avanzada y type safety.",
        alternatives: ["Vue.js + Nuxt", "Angular"],
      }
    } else {
      recommendations.technologies.frontend = {
        primary: ["Next.js", "React", "TypeScript"],
        reasoning: "Combinación equilibrada de productividad, rendimiento y mantenibilidad.",
        alternatives: ["Remix", "SvelteKit", "Vue.js + Nuxt"],
      }
    }
  }

  if (appType === "mobile") {
    if (budget === "minimal" || budget === "low") {
      recommendations.technologies.frontend = {
        primary: ["React Native", "Expo"],
        reasoning: "Desarrollo cross-platform eficiente en costos con una sola base de código para iOS y Android.",
        alternatives: ["Flutter", "Ionic"],
      }
    } else {
      recommendations.technologies.frontend = {
        primary: ["React Native", "Swift (iOS)", "Kotlin (Android)"],
        reasoning:
          "Combinación de desarrollo nativo para mejor rendimiento y React Native para funcionalidades compartidas.",
        alternatives: ["Flutter", "Native completo"],
      }
    }
  }

  // Backend recommendations
  if (appType === "api" || appType === "fullstack" || appType === "mobile") {
    if (timeline === "fast" || complexity === "simple") {
      recommendations.technologies.backend = {
        primary: ["Next.js API Routes", "Supabase", "PostgreSQL"],
        reasoning:
          "Backend integrado con Next.js para desarrollo rápido, Supabase proporciona auth y database out-of-the-box.",
        alternatives: ["Firebase", "Vercel Postgres", "PlanetScale"],
      }
    } else if (scale === "large" || scale === "xlarge") {
      recommendations.technologies.backend = {
        primary: ["Node.js", "Express/Fastify", "PostgreSQL", "Redis", "GraphQL"],
        reasoning: "Arquitectura escalable con caching, API flexible y base de datos robusta para alto tráfico.",
        alternatives: ["Go", "Rust", "Java Spring Boot"],
      }
    } else if (complexity === "very-complex") {
      recommendations.technologies.backend = {
        primary: ["Microservicios", "Node.js/Go", "Kafka", "PostgreSQL", "MongoDB"],
        reasoning: "Arquitectura de microservicios para sistemas distribuidos complejos con event streaming.",
        alternatives: ["Kubernetes", "Service Mesh", "gRPC"],
      }
    } else {
      recommendations.technologies.backend = {
        primary: ["Node.js", "Express", "PostgreSQL", "Prisma"],
        reasoning: "Stack backend moderno y productivo con ORM type-safe y base de datos relacional.",
        alternatives: ["NestJS", "tRPC", "Drizzle ORM"],
      }
    }
  }

  // Infrastructure recommendations
  if (budget === "minimal") {
    recommendations.technologies.infrastructure = {
      primary: ["Vercel", "Supabase", "Cloudflare"],
      reasoning: "Tier gratuito generoso, deploy automático, y CDN global sin configuración compleja.",
      alternatives: ["Netlify", "Railway", "Render"],
    }
  } else if (scale === "xlarge" || complexity === "very-complex") {
    recommendations.technologies.infrastructure = {
      primary: ["AWS", "Kubernetes", "Terraform", "CloudFlare"],
      reasoning: "Infraestructura enterprise-grade con auto-scaling, multi-región y IaC para gestión.",
      alternatives: ["Google Cloud Platform", "Azure", "DigitalOcean"],
    }
  } else if (budget === "low" || budget === "medium") {
    recommendations.technologies.infrastructure = {
      primary: ["Vercel", "Railway", "Upstash", "Cloudflare"],
      reasoning: "Balance óptimo entre costo y funcionalidad con servicios managed y fácil escalabilidad.",
      alternatives: ["Fly.io", "Render", "DigitalOcean App Platform"],
    }
  } else {
    recommendations.technologies.infrastructure = {
      primary: ["Vercel", "AWS", "Cloudflare", "PlanetScale"],
      reasoning: "Infraestructura premium con máximo rendimiento, disponibilidad global y servicios managed.",
      alternatives: ["Google Cloud", "Azure", "Fastly"],
    }
  }

  // Tools recommendations
  if (teamSize === "solo") {
    recommendations.technologies.tools = {
      primary: ["GitHub", "VS Code", "Vercel CLI"],
      reasoning: "Herramientas esenciales y simples para desarrollo individual eficiente.",
      alternatives: ["GitLab", "Cursor", "Warp"],
    }
  } else if (teamSize === "large") {
    recommendations.technologies.tools = {
      primary: ["GitHub", "Linear", "Datadog", "Sentry", "GitHub Actions"],
      reasoning: "Suite completa de herramientas para colaboración, monitoreo y CI/CD en equipos grandes.",
      alternatives: ["GitLab", "Jira", "New Relic", "CircleCI"],
    }
  } else {
    recommendations.technologies.tools = {
      primary: ["GitHub", "Linear", "Sentry", "GitHub Actions"],
      reasoning: "Herramientas colaborativas para gestión de proyectos, error tracking y deployment automatizado.",
      alternatives: ["GitLab", "Notion", "Rollbar", "Vercel"],
    }
  }

  // Generate summary
  recommendations.summary = generateSummary(appType, scale, complexity, timeline, budget)

  // Add considerations
  recommendations.considerations = generateConsiderations(appType, audience, scale, complexity, teamSize)

  return recommendations
}

function generateSummary(
  appType?: string,
  scale?: string,
  complexity?: string,
  timeline?: string,
  budget?: string,
): string {
  const parts: string[] = []

  if (appType === "web" || appType === "fullstack") {
    parts.push("una aplicación web moderna")
  } else if (appType === "mobile") {
    parts.push("una aplicación móvil")
  } else if (appType === "api") {
    parts.push("un servicio backend/API")
  }

  if (scale === "small") {
    parts.push("con escala pequeña")
  } else if (scale === "large" || scale === "xlarge") {
    parts.push("con alta escalabilidad")
  }

  if (timeline === "fast") {
    parts.push("y desarrollo rápido")
  }

  if (budget === "minimal" || budget === "low") {
    parts.push("optimizado para costos")
  }

  return `Basado en tus respuestas, recomendamos un stack para ${parts.join(", ")}. Las tecnologías seleccionadas equilibran rendimiento, productividad y mantenibilidad.`
}

function generateConsiderations(
  appType?: string,
  audience?: string,
  scale?: string,
  complexity?: string,
  teamSize?: string,
): string[] {
  const considerations: string[] = []

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
