import { data } from '@/constants'
import type { LinkCategory, Links } from '@/types'

export type CatalogLink = Links & { category: LinkCategory }

const CATEGORY_LABELS: Record<LinkCategory, string> = {
  contacts: 'Contact',
  socials: 'Personal',
  communities: 'Community',
  resources: 'Resources'
}

export function getCategoryLabel(category: LinkCategory) {
  return CATEGORY_LABELS[category]
}

export function getAllLinks(): CatalogLink[] {
  return [
    ...data.contacts.map((item) => ({ ...item, category: 'contacts' as const })),
    ...data.socials.map((item) => ({ ...item, category: 'socials' as const })),
    ...data.communities.map((item) => ({
      ...item,
      category: 'communities' as const
    })),
    ...data.resources.map((item) => ({
      ...item,
      category: 'resources' as const
    }))
  ]
}

export function getFeaturedLinks() {
  return getAllLinks().filter((item) => item.featured)
}

export function downloadVCard() {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name}`,
    'TITLE:Platform Engineer',
    data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : '',
    data.phone ? `TEL;TYPE=CELL:${data.phone}` : '',
    data.location ? `ADR;TYPE=HOME:;;;${data.location};;;` : '',
    data.siteUrl ? `URL:${data.siteUrl}` : '',
    'END:VCARD'
  ].filter(Boolean)

  const blob = new Blob([lines.join('\n')], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'harshhaa.vcf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export async function sharePage() {
  const url = data.siteUrl || window.location.href
  const title = `${data.name} — Links`

  if (navigator.share) {
    await navigator.share({
      title,
      text: data.about,
      url
    })
    return 'shared'
  }

  await navigator.clipboard.writeText(url)
  return 'copied'
}
