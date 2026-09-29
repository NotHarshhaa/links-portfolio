export type ServiceState = 'operational' | 'degraded' | 'down' | 'checking'

export interface MonitoredService {
  name: string
  url: string
  role: string
}

export interface ServiceStatus extends MonitoredService {
  status: ServiceState
  latency: number | null
}

export const MONITORED_SERVICES: MonitoredService[] = [
  {
    name: 'Main Portfolio',
    url: 'https://harshhaareddy.com',
    role: 'Primary Site & Projects'
  },
  {
    name: 'Engineering Blog',
    url: 'https://blog.harshhaareddy.com',
    role: 'Articles & Architecture'
  },
  {
    name: 'Resume & CV',
    url: 'https://cv.harshhaareddy.com',
    role: 'Work Experience & Credentials'
  },
  {
    name: 'Links Hub',
    url: 'https://links.harshhaareddy.com',
    role: 'Active Edge Node'
  },
  {
    name: 'GitHub Gateway',
    url: 'https://api.github.com/users/NotHarshhaa',
    role: 'Open Source Repositories'
  }
]

export function initialServiceStatuses(): ServiceStatus[] {
  return MONITORED_SERVICES.map((svc) => ({
    ...svc,
    status: 'checking' as const,
    latency: null
  }))
}
