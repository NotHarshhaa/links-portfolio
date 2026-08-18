import { type Icon } from '@tabler/icons-react'

export interface Data {
  name: string
  initials: string
  avatar: string
  about: string
  now?: string
  availability?: string
  location?: string
  timezone?: string
  email?: string
  phone?: string
  siteUrl?: string
  contacts: Links[]
  socials: Links[]
  communities: Links[]
  resources: Links[]
}

export interface Links {
  title: string
  url: string
  icon: typeof Icon
  description?: string
  featured?: boolean
}

export type LinkCategory = 'contacts' | 'socials' | 'communities' | 'resources'
