/** Four capability pillars shown on the home page. */
export const PILLARS = [
  {
    id: 'platform',
    kicker: 'Platform',
    title: 'Developer Platforms',
    description:
      'Internal developer platforms, Backstage portals, golden paths, and self-service that shorten the path from idea to production.',
    tags: ['IDP', 'Backstage', 'GitOps'],
    icon: 'layers',
  },
  {
    id: 'infra',
    kicker: 'AI Infra',
    title: 'AI Infrastructure',
    description:
      'GPU-accelerated Kubernetes, high-throughput inference with vLLM and Ollama, vector search, and dependable LLMOps foundations.',
    tags: ['vLLM', 'GPU', 'Qdrant'],
    icon: 'cpu',
  },
  {
    id: 'agents',
    kicker: 'Agentic',
    title: 'Autonomous Systems',
    description:
      'MCP servers, LangGraph workflows, and A2A coordination that let agents operate real cloud and DevOps tooling safely.',
    tags: ['MCP', 'LangGraph', 'A2A'],
    icon: 'network',
  },
  {
    id: 'product',
    kicker: 'Product',
    title: 'AI Products',
    description:
      'End-to-end AI products — retrieval, tool calling, evaluation, and interfaces people actually enjoy using every day.',
    tags: ['Next.js', 'FastAPI', 'RAG'],
    icon: 'sparkles',
  },
] as const

/** Headline metrics pulled from the engineering profile. */
export const IMPACT_STATS = [
  { value: '5+', label: 'Years in platform & DevOps' },
  { value: '40+', label: 'Production blueprints' },
  { value: '250K+', label: 'Engineers reached' },
  { value: '10', label: 'Engineering domains' },
] as const

export const SPECIALTIES = [
  'Platform Engineering',
  'DevOps & GitOps',
  'AI Infrastructure',
  'LLMOps',
  'GenAI & AI Agents',
  'Model Context Protocol (MCP)',
  'AI Product Development',
  'Kubernetes & Cloud'
]

/** Short descriptions for external links */
export const LINK_DESCRIPTIONS: Record<string, string> = {
  GitHub: 'Open-source blueprints & tooling',
  LinkedIn: 'Professional timeline & network',
  Telegram: 'DevOps community & updates',
  Blog: 'Long-form engineering notes',
  Resume: 'Experience, stack & impact',
  Portfolio: 'Personal site and main portfolio',
  Email: 'Direct email contact',
  WhatsApp: 'Quick instant message'
}

export const CURRENT_FOCUS = [
  'Platform Engineering',
  'Internal Developer Platforms (IDP)',
  'Self-Service Portals & Golden Paths',
  'GitOps with ArgoCD & Flux',
  'AI Infrastructure & GPU Orchestration',
  'LLMOps with vLLM & Ollama',
  'Vector Databases (Qdrant, pgvector)',
  'Generative AI & Agentic AI Systems',
  'Model Context Protocol (MCP)',
  'Multi-Agent Coordination (Agent2Agent)',
  'LangGraph & LangChain Workflows',
  'AI Product Development & Tool Calling',
  'Infrastructure as Code (Terraform & OpenTofu)',
  'Zero-Trust Observability (OTel, Prometheus, Loki)',
  'Developer Experience (DevEx)'
]

export const EXPERTISE = [
  'Platform Engineering & IDP',
  'Enterprise DevOps & CI/CD Pipelines',
  'Production Kubernetes (EKS, AKS)',
  'AI Infrastructure & GPU Clusters',
  'LLMOps, vLLM & Local Model Serving',
  'Autonomous AI Agents & Workflows',
  'Model Context Protocol (MCP) Servers',
  'RAG Architectures & Vector Search',
  'Full-Stack AI Application Development',
  'Infrastructure as Code (Terraform, Ansible)',
  'Full-Stack Telemetry (OTel, Prometheus, Grafana)',
  'Open-Source Engineering & Blueprints'
]

export const LEARNING_HUB = [
  {
    title: 'Docs Portal',
    description: 'DevOps, Cloud & AI documentation',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'Projects Hub',
    description: 'Hands-on real-world projects',
    url: 'https://github.com/NotHarshhaa/DevOps-Projects'
  },
  {
    title: 'Kubernetes Learning',
    description: 'Beginner → CKA',
    url: 'https://github.com/NotHarshhaa/kubernetes-learning-path'
  },
  {
    title: 'Docker to Kubernetes',
    description: 'Complete container journey',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'MLOps Generator',
    description: 'Production-ready MLOps templates',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'DevOps Generator',
    description: 'DevOps project scaffolding',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'AWS Infra Generator',
    description: 'AWS infrastructure templates',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'Monitoring in a Box',
    description: 'Observability stack',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'AI Platform Engineering',
    description: 'AI infrastructure resources',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'Agentic AI',
    description: 'AI Agent learning resources',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'MCP Learning',
    description: 'Model Context Protocol resources',
    url: 'https://github.com/NotHarshhaa'
  },
  {
    title: 'Repositories Hub',
    description: 'Open-source projects',
    url: 'https://github.com/NotHarshhaa'
  }
]
