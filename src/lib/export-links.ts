import { getAllLinks } from './links'
import { data } from '@/constants'
import { toast } from 'sonner'

export function exportLinksMarkdown(): void {
  const links = getAllLinks()
  const content = [
    `# ${data.name} — Links & Resources`,
    `> ${data.about}`,
    '',
    `**Website**: ${data.siteUrl}`,
    `**Email**: ${data.email}`,
    '',
    '## All Links',
    '',
    ...links.map((link, i) => `${i + 1}. [${link.title}](${link.url})${link.description ? ` — ${link.description}` : ''}`)
  ].join('\n')

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'harshhaa-links.md'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  toast.success('Links exported as Markdown')
}

export function exportLinksJSON(): void {
  const links = getAllLinks()
  const payload = {
    name: data.name,
    title: 'Platform Engineer & AI Infrastructure',
    site: data.siteUrl,
    exportedAt: new Date().toISOString(),
    links: links.map(l => ({
      title: l.title,
      url: l.url,
      category: l.category,
      description: l.description
    }))
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'harshhaa-links.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  toast.success('Links exported as JSON')
}

export async function copyAllLinks(): Promise<void> {
  const links = getAllLinks()
  const text = links.map(l => `${l.title}: ${l.url}`).join('\n')
  await navigator.clipboard.writeText(text)
  toast.success('All links copied to clipboard')
}
