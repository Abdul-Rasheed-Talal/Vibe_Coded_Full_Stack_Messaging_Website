'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

export const LazyChatWindow = dynamic(() => import('./ChatWindow').then(mod => mod.ChatWindow), {
    loading: () => (
        <div className="flex h-full items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">Loading Vibe...</p>
            </div>
        </div>
    ),
    ssr: false
})
