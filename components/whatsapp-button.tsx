'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923156240776?text=Hello%20Khan%20Store%2C%20I%20need%20help%20with%20my%20order"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      title="Chat with us on WhatsApp"
    >
      <Button
        size="icon"
        className="w-16 h-16 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all group-hover:scale-110"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
      <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
        1
      </span>
    </a>
  )
}
