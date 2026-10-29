import { data } from '@/constants'

export function generateVCard(): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name}`,
    `N:Reddy;Harshhaa;Vardhan;;`,
    `TITLE:Platform Engineer & AI Infrastructure`,
    `ORG:Harshhaa`,
    `EMAIL;TYPE=INTERNET,PREF:${data.email}`,
    data.phone ? `TEL;TYPE=CELL:${data.phone}` : '',
    `ADR;TYPE=HOME:;;Hyderabad;;Telangana;;India`,
    `URL;TYPE=PREF:${data.siteUrl}`,
    `NOTE:Platform Engineer • DevOps • AI Infrastructure & Agentic Systems. GitHub: https://github.com/NotHarshhaa`,
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\r\n')

  return vcard
}

export function downloadVCard(): void {
  const vcard = generateVCard()
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'Harshhaa_Vardhan_Reddy.vcf')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
