import { Icon } from '@tabler/icons-react'

export interface Data {
  name: string
  initials: string
  avatar: string
  about: string
  contacts: Links[]
  socials: Links[]
  communities: Links[]
  resources: Links[]
}

export interface Links {
  title: string
  url: string
  icon: typeof Icon
}
