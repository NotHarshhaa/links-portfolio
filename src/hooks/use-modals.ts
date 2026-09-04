'use client'

import { useEffect, useState } from 'react'

export type ModalType = 'qr' | 'telemetry' | 'terminal' | null

const EVENT_NAME = 'app:open-modal'

export function triggerModal(modal: ModalType) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: modal }))
}

export function useActiveModal() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<ModalType>
      setActiveModal(custom.detail)
    }

    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [])

  return {
    activeModal,
    openModal: (type: ModalType) => triggerModal(type),
    closeModal: () => triggerModal(null)
  }
}
