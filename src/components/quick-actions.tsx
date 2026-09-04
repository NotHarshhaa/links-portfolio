'use client'

import { Contact, Dices, Mail, QrCode, Share2, Terminal } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { data } from '@/constants'
import { downloadVCard, getAllLinks, sharePage } from '@/lib/links'
import { triggerModal } from '@/hooks/use-modals'

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
      <Button variant="outline" size="sm" onClick={() => triggerModal('qr')}>
        <QrCode className="size-4" />
        QR Pass
      </Button>
      <Button variant="outline" size="sm" onClick={() => triggerModal('terminal')}>
        <Terminal className="size-4" />
        Terminal
      </Button>
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 className="size-4" />
        Share
      </Button>
      <Button variant="outline" size="sm" onClick={saveContact}>
        <Contact className="size-4" />
        Save contact
      </Button>
      <Button variant="outline" size="sm" onClick={copyEmail}>
        <Mail className="size-4" />
        Copy email
      </Button>
      <Button variant="outline" size="sm" onClick={surprise}>
        <Dices className="size-4" />
        Surprise me
      </Button>
    </div>
  )
}

