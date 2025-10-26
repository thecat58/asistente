#!/usr/bin/env python3
"""
Árbol de Decisión para Selección de Tecnologías
Este script implementa la lógica de recomendación usando un árbol de decisión en Python
"""

import json
import sys
from typing import Dict, List, Optional


class TechNode:
    """Nodo del árbol de decisión"""
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
        self.children: Dict[str, 'TechNode'] = {}
        self.recommendations: Optional[Dict] = None
    
    def add_child(self, condition: str, node: 'TechNode'):
        """Agrega un hijo al nodo basado en una condición"""
        self.children[condition] = node
        return node
    
    def set_recommendations(self, recommendations: Dict):
        """Establece las recomendaciones para este nodo terminal"""
        self.recommendations = recommendations


class DecisionTree:
    """Árbol de decisión para recomendaciones tecnológicas"""
    
    def __init__(self):
        self.root = self._build_tree()
    
    def _build_tree(self) -> TechNode:
        """Construye el árbol de decisión completo"""
        root = TechNode("root", "Inicio del árbol de decisión")
        
        # Nivel 1: Tipo de aplicación
        web_node = root.add_child("web", TechNode("web", "Aplicación Web"))
        mobile_node = root.add_child("mobile", TechNode("mobile", "Aplicación Móvil"))
        api_node = root.add_child("api", TechNode("api", "API/Backend"))
        desktop_node = root.add_child("desktop", TechNode("desktop", "Aplicación de Escritorio"))
        fullstack_node = root.add_child("fullstack", TechNode("fullstack", "Full-Stack"))
        
        # Rama WEB
        self._build_web_branch(web_node)
        
        # Rama MOBILE
        self._build_mobile_branch(mobile_node)
        
        # Rama API
        self._build_api_branch(api_node)
        
        # Rama DESKTOP
        self._build_desktop_branch(desktop_node)
        
        # Rama FULLSTACK
        self._build_fullstack_branch(fullstack_node)
        
        return root
    
    def _build_web_branch(self, node: TechNode):
        """Construye la rama para aplicaciones web"""
        # Nivel 2: Timeline
        fast_node = node.add_child("fast", TechNode("fast", "Desarrollo rápido"))
        normal_node = node.add_child("normal", TechNode("normal", "Timeline normal"))
        long_node = node.add_child("long", TechNode("long", "Timeline largo"))
        extended_node = node.add_child("extended", TechNode("extended", "Timeline extendido"))
        
        # Fast + Simple
        fast_simple = fast_node.add_child("simple", TechNode("simple", "Complejidad simple"))
        fast_simple.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "React", "Tailwind CSS"],
                "reasoning": "Stack rápido y productivo para MVPs y prototipos con SSR/SSG integrado",
                "alternatives": ["Astro", "Remix", "SvelteKit"]
            },
            "backend": {
                "primary": ["Next.js API Routes", "Supabase"],
                "reasoning": "Backend integrado sin configuración adicional, ideal para desarrollo rápido",
                "alternatives": ["Firebase", "Vercel Postgres"]
            },
            "infrastructure": {
                "primary": ["Vercel", "Cloudflare"],
                "reasoning": "Deploy automático y CDN global sin configuración",
                "alternatives": ["Netlify", "Railway"]
            },
            "tools": {
                "primary": ["GitHub", "VS Code", "Vercel CLI"],
                "reasoning": "Herramientas esenciales para desarrollo ágil",
                "alternatives": ["GitLab", "Cursor"]
            }
        })
        
        # Fast + Complex
        fast_complex = fast_node.add_child("complex", TechNode("complex", "Complejidad alta"))
        fast_complex.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "TypeScript", "React Query"],
                "reasoning": "Stack moderno con type safety para desarrollo rápido pero robusto",
                "alternatives": ["Remix", "SvelteKit"]
            },
            "backend": {
                "primary": ["Next.js", "tRPC", "Prisma", "PostgreSQL"],
                "reasoning": "Type-safe end-to-end con ORM moderno para desarrollo rápido",
                "alternatives": ["NestJS", "Fastify"]
            },
            "infrastructure": {
                "primary": ["Vercel", "Supabase", "Upstash"],
                "reasoning": "Servicios managed para enfocarse en features, no en infraestructura",
                "alternatives": ["Railway", "PlanetScale"]
            },
            "tools": {
                "primary": ["GitHub", "Linear", "Sentry"],
                "reasoning": "Herramientas para gestión ágil y monitoreo de errores",
                "alternatives": ["GitLab", "Jira", "Rollbar"]
            }
        })
        
        # Normal + Medium Scale
        normal_medium = normal_node.add_child("medium", TechNode("medium", "Escala media"))
        normal_medium.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
                "reasoning": "Stack equilibrado con gestión de estado para aplicaciones de escala media",
                "alternatives": ["Remix", "Vue.js + Nuxt"]
            },
            "backend": {
                "primary": ["Node.js", "Express", "PostgreSQL", "Prisma"],
                "reasoning": "Backend escalable con ORM type-safe y base de datos robusta",
                "alternatives": ["NestJS", "Fastify", "Drizzle"]
            },
            "infrastructure": {
                "primary": ["Vercel", "Railway", "Cloudflare", "Upstash"],
                "reasoning": "Infraestructura managed con buen balance costo-rendimiento",
                "alternatives": ["Fly.io", "Render", "DigitalOcean"]
            },
            "tools": {
                "primary": ["GitHub", "Linear", "Sentry", "GitHub Actions"],
                "reasoning": "Suite completa para colaboración y CI/CD",
                "alternatives": ["GitLab", "Notion", "CircleCI"]
            }
        })
        
        # Long + Large Scale
        long_large = long_node.add_child("large", TechNode("large", "Escala grande"))
        long_large.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "TypeScript", "React Query", "Zustand", "Tailwind CSS"],
                "reasoning": "Stack enterprise con gestión de estado avanzada y caching optimizado",
                "alternatives": ["Remix", "Angular"]
            },
            "backend": {
                "primary": ["Node.js", "NestJS", "PostgreSQL", "Redis", "GraphQL"],
                "reasoning": "Arquitectura escalable con caching, API flexible y microservicios",
                "alternatives": ["Go", "Java Spring Boot"]
            },
            "infrastructure": {
                "primary": ["AWS", "Kubernetes", "Terraform", "CloudFlare"],
                "reasoning": "Infraestructura enterprise con auto-scaling y multi-región",
                "alternatives": ["Google Cloud", "Azure"]
            },
            "tools": {
                "primary": ["GitHub", "Linear", "Datadog", "Sentry", "GitHub Actions"],
                "reasoning": "Herramientas enterprise para observabilidad y colaboración",
                "alternatives": ["GitLab", "Jira", "New Relic"]
            }
        })
    
    def _build_mobile_branch(self, node: TechNode):
        """Construye la rama para aplicaciones móviles"""
        # Budget-based decisions
        minimal_node = node.add_child("minimal", TechNode("minimal", "Presupuesto mínimo"))
        minimal_node.set_recommendations({
            "frontend": {
                "primary": ["React Native", "Expo"],
                "reasoning": "Desarrollo cross-platform eficiente con una sola base de código",
                "alternatives": ["Flutter", "Ionic"]
            },
            "backend": {
                "primary": ["Firebase", "Supabase"],
                "reasoning": "Backend-as-a-Service gratuito con auth y database incluidos",
                "alternatives": ["AWS Amplify", "Appwrite"]
            },
            "infrastructure": {
                "primary": ["Firebase Hosting", "Expo EAS"],
                "reasoning": "Hosting y build service gratuitos para apps móviles",
                "alternatives": ["Vercel", "Netlify"]
            },
            "tools": {
                "primary": ["GitHub", "Expo Go", "React Native Debugger"],
                "reasoning": "Herramientas gratuitas para desarrollo móvil",
                "alternatives": ["GitLab", "Flipper"]
            }
        })
        
        high_budget = node.add_child("high", TechNode("high", "Presupuesto alto"))
        high_budget.set_recommendations({
            "frontend": {
                "primary": ["Swift (iOS)", "Kotlin (Android)", "React Native"],
                "reasoning": "Desarrollo nativo para máximo rendimiento con código compartido",
                "alternatives": ["Flutter", "Native completo"]
            },
            "backend": {
                "primary": ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
                "reasoning": "Backend robusto y escalable para apps de producción",
                "alternatives": ["Go", "AWS AppSync"]
            },
            "infrastructure": {
                "primary": ["AWS", "Fastly", "CloudFlare"],
                "reasoning": "Infraestructura premium con CDN global y baja latencia",
                "alternatives": ["Google Cloud", "Azure"]
            },
            "tools": {
                "primary": ["GitHub", "Fastlane", "Firebase Crashlytics", "TestFlight"],
                "reasoning": "Suite completa para CI/CD y distribución de apps",
                "alternatives": ["GitLab", "Bitrise", "App Center"]
            }
        })
    
    def _build_api_branch(self, node: TechNode):
        """Construye la rama para APIs/Backend"""
        # Scale-based decisions
        small_scale = node.add_child("small", TechNode("small", "Escala pequeña"))
        small_scale.set_recommendations({
            "backend": {
                "primary": ["Node.js", "Express", "PostgreSQL"],
                "reasoning": "Stack simple y efectivo para APIs de escala pequeña",
                "alternatives": ["Python + FastAPI", "Go + Gin"]
            },
            "infrastructure": {
                "primary": ["Railway", "Render", "Supabase"],
                "reasoning": "Hosting económico con base de datos incluida",
                "alternatives": ["Fly.io", "DigitalOcean"]
            },
            "tools": {
                "primary": ["GitHub", "Postman", "Sentry"],
                "reasoning": "Herramientas básicas para desarrollo y testing de APIs",
                "alternatives": ["GitLab", "Insomnia", "Rollbar"]
            }
        })
        
        xlarge_scale = node.add_child("xlarge", TechNode("xlarge", "Escala muy grande"))
        xlarge_scale.set_recommendations({
            "backend": {
                "primary": ["Microservicios", "Go", "Kafka", "PostgreSQL", "Redis", "gRPC"],
                "reasoning": "Arquitectura distribuida para escala masiva con event streaming",
                "alternatives": ["Java Spring Boot", "Rust", "RabbitMQ"]
            },
            "infrastructure": {
                "primary": ["Kubernetes", "AWS", "Terraform", "Service Mesh"],
                "reasoning": "Orquestación de contenedores y IaC para sistemas distribuidos",
                "alternatives": ["Google Cloud", "Azure", "Nomad"]
            },
            "tools": {
                "primary": ["GitHub", "Datadog", "PagerDuty", "ArgoCD"],
                "reasoning": "Observabilidad y deployment continuo para microservicios",
                "alternatives": ["GitLab", "New Relic", "Spinnaker"]
            }
        })
    
    def _build_desktop_branch(self, node: TechNode):
        """Construye la rama para aplicaciones de escritorio"""
        simple_node = node.add_child("simple", TechNode("simple", "App simple"))
        simple_node.set_recommendations({
            "frontend": {
                "primary": ["Electron", "React", "TypeScript"],
                "reasoning": "Desarrollo cross-platform con tecnologías web familiares",
                "alternatives": ["Tauri", "Flutter Desktop"]
            },
            "infrastructure": {
                "primary": ["GitHub Releases", "Electron Builder"],
                "reasoning": "Distribución automática de binarios para múltiples plataformas",
                "alternatives": ["S3 + CloudFront", "Snapcraft"]
            },
            "tools": {
                "primary": ["GitHub", "Electron Forge", "VS Code"],
                "reasoning": "Herramientas para desarrollo y empaquetado de apps desktop",
                "alternatives": ["GitLab", "electron-builder"]
            }
        })
        
        complex_node = node.add_child("complex", TechNode("complex", "App compleja"))
        complex_node.set_recommendations({
            "frontend": {
                "primary": ["Tauri", "Rust", "React/Vue"],
                "reasoning": "Rendimiento nativo con menor footprint que Electron",
                "alternatives": ["Qt", "Native (C++/Swift/Kotlin)"]
            },
            "infrastructure": {
                "primary": ["GitHub Actions", "Code Signing", "Auto-updater"],
                "reasoning": "CI/CD completo con firma de código y actualizaciones automáticas",
                "alternatives": ["GitLab CI", "AppCenter"]
            },
            "tools": {
                "primary": ["GitHub", "Rust Analyzer", "cargo"],
                "reasoning": "Toolchain completo para desarrollo con Rust",
                "alternatives": ["GitLab", "CLion"]
            }
        })
    
    def _build_fullstack_branch(self, node: TechNode):
        """Construye la rama para aplicaciones full-stack"""
        # Team size based
        solo_node = node.add_child("solo", TechNode("solo", "Desarrollador solo"))
        solo_node.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "React", "Tailwind CSS"],
                "reasoning": "Framework all-in-one que reduce decisiones y configuración",
                "alternatives": ["Remix", "SvelteKit"]
            },
            "backend": {
                "primary": ["Next.js API Routes", "Prisma", "PostgreSQL"],
                "reasoning": "Backend integrado con ORM type-safe, todo en un proyecto",
                "alternatives": ["Supabase", "Firebase"]
            },
            "infrastructure": {
                "primary": ["Vercel", "Supabase", "Cloudflare"],
                "reasoning": "Deploy con un click y servicios managed sin DevOps",
                "alternatives": ["Netlify", "Railway"]
            },
            "tools": {
                "primary": ["GitHub", "VS Code", "Vercel CLI"],
                "reasoning": "Herramientas simples y productivas para desarrollo individual",
                "alternatives": ["GitLab", "Cursor"]
            }
        })
        
        large_team = node.add_child("large", TechNode("large", "Equipo grande"))
        large_team.set_recommendations({
            "frontend": {
                "primary": ["Next.js", "TypeScript", "Turborepo", "Tailwind CSS"],
                "reasoning": "Monorepo con múltiples apps y packages compartidos",
                "alternatives": ["Nx", "Lerna"]
            },
            "backend": {
                "primary": ["NestJS", "GraphQL", "PostgreSQL", "Redis", "Microservicios"],
                "reasoning": "Arquitectura modular y escalable para equipos grandes",
                "alternatives": ["tRPC", "Go microservices"]
            },
            "infrastructure": {
                "primary": ["Kubernetes", "AWS", "Terraform", "ArgoCD"],
                "reasoning": "Infraestructura enterprise con GitOps y multi-ambiente",
                "alternatives": ["Google Cloud", "Azure", "Pulumi"]
            },
            "tools": {
                "primary": ["GitHub", "Linear", "Datadog", "Sentry", "Figma"],
                "reasoning": "Suite enterprise para colaboración, monitoreo y diseño",
                "alternatives": ["GitLab", "Jira", "New Relic"]
            }
        })
    
    def traverse(self, answers: Dict[str, str]) -> Dict:
        """
        Recorre el árbol basado en las respuestas del usuario
        
        Args:
            answers: Diccionario con las respuestas del usuario
            
        Returns:
            Diccionario con las recomendaciones
        """
        current = self.root
        path = []
        
        # Orden de prioridad para recorrer el árbol
        priority_order = [
            "app-type",      # Nivel 1: Tipo de aplicación
            "timeline",      # Nivel 2: Timeline
            "complexity",    # Nivel 3: Complejidad
            "scale",         # Nivel 3: Escala
            "budget",        # Nivel 2: Presupuesto (para mobile)
            "team-size",     # Nivel 2: Tamaño de equipo (para fullstack)
        ]
        
        # Recorrer el árbol según las respuestas
        for key in priority_order:
            if key not in answers:
                continue
                
            value = answers[key]
            
            if value in current.children:
                current = current.children[value]
                path.append(f"{key}={value}")
            
            # Si llegamos a un nodo con recomendaciones, retornar
            if current.recommendations:
                return self._format_recommendations(current.recommendations, answers, path)
        
        # Si no encontramos recomendaciones específicas, usar recomendaciones por defecto
        return self._get_default_recommendations(answers)
    
    def _format_recommendations(self, recommendations: Dict, answers: Dict, path: List[str]) -> Dict:
        """Formatea las recomendaciones con información adicional"""
        
        # Generar resumen
        summary = self._generate_summary(answers)
        
        # Generar consideraciones
        considerations = self._generate_considerations(answers)
        
        return {
            "summary": summary,
            "technologies": recommendations,
            "considerations": considerations,
            "decision_path": " → ".join(path)
        }
    
    def _generate_summary(self, answers: Dict) -> str:
        """Genera un resumen basado en las respuestas"""
        app_type = answers.get("app-type", "aplicación")
        scale = answers.get("scale", "")
        timeline = answers.get("timeline", "")
        budget = answers.get("budget", "")
        
        parts = []
        
        type_map = {
            "web": "una aplicación web moderna",
            "mobile": "una aplicación móvil",
            "api": "un servicio backend/API",
            "desktop": "una aplicación de escritorio",
            "fullstack": "una aplicación full-stack"
        }
        parts.append(type_map.get(app_type, "una aplicación"))
        
        if scale in ["large", "xlarge"]:
            parts.append("con alta escalabilidad")
        elif scale == "small":
            parts.append("con escala pequeña")
        
        if timeline == "fast":
            parts.append("y desarrollo rápido")
        
        if budget in ["minimal", "low"]:
            parts.append("optimizado para costos")
        
        return f"Basado en tus respuestas, recomendamos un stack para {', '.join(parts)}. Las tecnologías seleccionadas equilibran rendimiento, productividad y mantenibilidad."
    
    def _generate_considerations(self, answers: Dict) -> List[str]:
        """Genera consideraciones basadas en las respuestas"""
        considerations = []
        
        audience = answers.get("audience")
        scale = answers.get("scale")
        complexity = answers.get("complexity")
        team_size = answers.get("team-size")
        app_type = answers.get("app-type")
        
        if audience == "public":
            considerations.append("Implementa medidas de seguridad robustas (rate limiting, validación de inputs, HTTPS)")
            considerations.append("Considera SEO y accesibilidad desde el inicio")
        
        if audience == "internal":
            considerations.append("Integra con sistemas de autenticación corporativos (SSO, LDAP)")
        
        if scale in ["large", "xlarge"]:
            considerations.append("Planifica estrategia de caching y CDN desde el inicio")
            considerations.append("Implementa monitoreo y observabilidad comprehensivos")
            considerations.append("Considera arquitectura multi-región para latencia global")
        
        if complexity in ["complex", "very-complex"]:
            considerations.append("Documenta arquitectura y decisiones técnicas detalladamente")
            considerations.append("Implementa testing comprehensivo (unit, integration, e2e)")
            considerations.append("Establece prácticas de code review y CI/CD desde el inicio")
        
        if team_size == "large":
            considerations.append("Define convenciones de código y guías de estilo claras")
            considerations.append("Implementa monorepo si tienes múltiples proyectos relacionados")
        
        if app_type == "mobile":
            considerations.append("Planifica estrategia de actualizaciones y versionado de app")
            considerations.append("Considera offline-first architecture para mejor UX")
        
        return considerations
    
    def _get_default_recommendations(self, answers: Dict) -> Dict:
        """Retorna recomendaciones por defecto si no se encuentra un camino específico"""
        return {
            "summary": "Recomendaciones generales basadas en tus respuestas.",
            "technologies": {
                "frontend": {
                    "primary": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
                    "reasoning": "Stack moderno y versátil para la mayoría de proyectos",
                    "alternatives": ["Remix", "SvelteKit", "Vue.js"]
                },
                "backend": {
                    "primary": ["Node.js", "Express", "PostgreSQL"],
                    "reasoning": "Backend confiable y ampliamente adoptado",
                    "alternatives": ["NestJS", "Fastify", "Python + FastAPI"]
                },
                "infrastructure": {
                    "primary": ["Vercel", "Railway", "Cloudflare"],
                    "reasoning": "Infraestructura managed con buen balance",
                    "alternatives": ["Netlify", "Render", "DigitalOcean"]
                },
                "tools": {
                    "primary": ["GitHub", "VS Code", "Linear"],
                    "reasoning": "Herramientas estándar de la industria",
                    "alternatives": ["GitLab", "Cursor", "Notion"]
                }
            },
            "considerations": self._generate_considerations(answers),
            "decision_path": "default"
        }


def main():
    """Función principal que procesa las respuestas y retorna recomendaciones"""
    try:
        # Leer respuestas desde stdin (JSON)
        input_data = sys.stdin.read()
        answers_list = json.loads(input_data)
        
        # Convertir lista de respuestas a diccionario
        answers = {answer["questionId"]: answer["value"] for answer in answers_list}
        
        # Crear árbol de decisión
        tree = DecisionTree()
        
        # Obtener recomendaciones
        recommendations = tree.traverse(answers)
        
        # Retornar como JSON
        print(json.dumps(recommendations, ensure_ascii=False, indent=2))
        
    except Exception as e:
        error_response = {
            "error": str(e),
            "summary": "Error al procesar las recomendaciones",
            "technologies": {},
            "considerations": []
        }
        print(json.dumps(error_response, ensure_ascii=False, indent=2))
        sys.exit(1)


if __name__ == "__main__":
    main()
