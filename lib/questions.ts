export interface Question {
  id: string
  category: string
  text: string
  description?: string
  options: {
    label: string
    value: string
    description?: string
  }[]
}

export interface Answer {
  questionId: string
  value: string
}

export const questions: Question[] = [
  {
    id: "app-type",
    category: "Tipo de Aplicación",
    text: "¿Qué tipo de aplicación deseas construir?",
    description: "Esto nos ayudará a determinar las tecnologías más adecuadas para tu proyecto.",
    options: [
      {
        label: "Aplicación Web",
        value: "web",
        description: "Sitio web o aplicación web accesible desde navegadores",
      },
      {
        label: "Aplicación Móvil",
        value: "mobile",
        description: "App nativa o híbrida para iOS y/o Android",
      },
      {
        label: "API / Backend",
        value: "api",
        description: "Servicio backend, API REST o GraphQL",
      },
      {
        label: "Aplicación de Escritorio",
        value: "desktop",
        description: "Software para Windows, macOS o Linux",
      },
      {
        label: "Full-Stack",
        value: "fullstack",
        description: "Aplicación completa con frontend y backend integrados",
      },
    ],
  },
  {
    id: "audience",
    category: "Audiencia",
    text: "¿Quién será el público objetivo?",
    description: "El tipo de usuarios influye en las decisiones de arquitectura y seguridad.",
    options: [
      {
        label: "Público General",
        value: "public",
        description: "Usuarios externos, clientes, visitantes web",
      },
      {
        label: "Interno / Empresarial",
        value: "internal",
        description: "Empleados, herramientas internas, sistemas corporativos",
      },
      {
        label: "B2B / Partners",
        value: "b2b",
        description: "Otras empresas, integraciones, servicios empresariales",
      },
      {
        label: "Desarrolladores",
        value: "developers",
        description: "API pública, SDK, plataforma para desarrolladores",
      },
    ],
  },
  {
    id: "scale",
    category: "Escala",
    text: "¿Qué escala de usuarios esperas?",
    description: "La escala esperada determina la arquitectura y la infraestructura necesaria.",
    options: [
      {
        label: "Pequeña (< 1,000 usuarios)",
        value: "small",
        description: "Proyecto personal, MVP, startup temprana",
      },
      {
        label: "Media (1,000 - 100,000 usuarios)",
        value: "medium",
        description: "Startup en crecimiento, producto establecido",
      },
      {
        label: "Grande (100,000 - 1M usuarios)",
        value: "large",
        description: "Empresa consolidada, alto tráfico",
      },
      {
        label: "Muy Grande (> 1M usuarios)",
        value: "xlarge",
        description: "Escala masiva, distribución global",
      },
    ],
  },
  {
    id: "budget",
    category: "Presupuesto",
    text: "¿Cuál es tu presupuesto para infraestructura?",
    description: "El presupuesto influye en las opciones de hosting y servicios cloud.",
    options: [
      {
        label: "Mínimo / Gratuito",
        value: "minimal",
        description: "Usar servicios gratuitos o de bajo costo",
      },
      {
        label: "Bajo ($0 - $100/mes)",
        value: "low",
        description: "Presupuesto limitado, optimizar costos",
      },
      {
        label: "Medio ($100 - $1,000/mes)",
        value: "medium",
        description: "Presupuesto moderado, servicios managed",
      },
      {
        label: "Alto (> $1,000/mes)",
        value: "high",
        description: "Presupuesto flexible, servicios premium",
      },
    ],
  },
  {
    id: "team-size",
    category: "Equipo",
    text: "¿Cuál es el tamaño de tu equipo de desarrollo?",
    description: "El tamaño del equipo afecta la complejidad de las herramientas y procesos.",
    options: [
      {
        label: "Solo / 1-2 personas",
        value: "solo",
        description: "Desarrollador individual o equipo muy pequeño",
      },
      {
        label: "Pequeño (3-5 personas)",
        value: "small",
        description: "Equipo pequeño, comunicación directa",
      },
      {
        label: "Medio (6-15 personas)",
        value: "medium",
        description: "Equipo establecido, necesita coordinación",
      },
      {
        label: "Grande (> 15 personas)",
        value: "large",
        description: "Múltiples equipos, procesos formales",
      },
    ],
  },
  {
    id: "timeline",
    category: "Tiempo",
    text: "¿Cuál es tu timeline de desarrollo?",
    description: "El tiempo disponible influye en la elección de frameworks y herramientas.",
    options: [
      {
        label: "Rápido (< 1 mes)",
        value: "fast",
        description: "MVP rápido, prototipo, proof of concept",
      },
      {
        label: "Normal (1-3 meses)",
        value: "normal",
        description: "Desarrollo estándar, producto inicial",
      },
      {
        label: "Largo (3-6 meses)",
        value: "long",
        description: "Proyecto complejo, múltiples fases",
      },
      {
        label: "Muy Largo (> 6 meses)",
        value: "extended",
        description: "Proyecto empresarial, desarrollo continuo",
      },
    ],
  },
  {
    id: "complexity",
    category: "Complejidad",
    text: "¿Qué nivel de complejidad técnica tiene tu proyecto?",
    description: "La complejidad determina las tecnologías y arquitecturas más apropiadas.",
    options: [
      {
        label: "Simple",
        value: "simple",
        description: "CRUD básico, sitio informativo, landing page",
      },
      {
        label: "Moderada",
        value: "moderate",
        description: "Lógica de negocio, autenticación, integraciones básicas",
      },
      {
        label: "Compleja",
        value: "complex",
        description: "Múltiples servicios, procesamiento en tiempo real, ML/AI",
      },
      {
        label: "Muy Compleja",
        value: "very-complex",
        description: "Microservicios, big data, sistemas distribuidos",
      },
    ],
  },
]
