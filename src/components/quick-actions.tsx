'use client'

import { Contact, Dices, Mail, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { data } from '@/constants'
import { downloadVCard, getAllLinks, sharePage } from '@/lib/links'

export function QuickActions() {
  const copyEmail = async () => {
    if (!data.email) return
    try {
      await navigator.clipboard.writeText(data.email)
      toast.success('Email copied')
    } catch {
      toast.error('Could not copy email')
    }
  }

  const share = async () => {
    try {
      const result = await sharePage()
      if (result === 'copied') toast.success('Page link copied')
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      toast.error('Could not share page')
    }
  }

  const surprise = () => {
    const pool = getAllLinks().filter((item) => item.category === 'resources')
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (!pick) return
    toast.success(`Opening ${pick.title}`)
    window.open(pick.url, '_blank', 'noopener,noreferrer')
  }

  const saveContact = () => {
    downloadVCard()
    toast.success('Contact card downloaded')
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 />
        Share
      </Button>
      <Button variant="outline" size="sm" onClick={saveContact}>
        <Contact />
        Save contact
      </Button>
      <Button variant="outline" size="sm" onClick={copyEmail}>
        <Mail />
        Copy email
      </Button>
      <Button variant="outline" size="sm" onClick={surprise}>
        <Dices />
        Surprise me
      </Button>
    </div>
  )
}
