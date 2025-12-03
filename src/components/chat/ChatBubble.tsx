'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ChatBubbleProps {
    message: string
    isSender: boolean
    timestamp: string
    status?: 'sent' | 'delivered' | 'read'
    avatarUrl?: string
}

export function ChatBubble({ message, isSender, timestamp, status, avatarUrl }: ChatBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
                "flex w-full mb-4",
                isSender ? "justify-end" : "justify-start"
            )}
        >
            <div className={cn("flex max-w-[70%] md:max-w-[60%]", isSender ? "flex-row-reverse" : "flex-row")}>
                {/* Avatar for receiver */}
                {!isSender && avatarUrl && (
                    <div className="mr-2 flex-shrink-0 self-end">
                        <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full ring-2 ring-border/50" />
                    </div>
                )}

                <div className={cn(
                    "relative px-4 py-3 shadow-md transition-all duration-200 hover:shadow-lg group",
                    isSender
                        ? "bg-gradient-to-br from-primary to-secondary text-white rounded-2xl rounded-tr-sm"
                        : "bg-card/80 backdrop-blur-md border border-border/50 text-foreground rounded-2xl rounded-tl-sm"
                )}>
                    <p className="text-sm md:text-base leading-relaxed break-words">{message}</p>

                    <div className={cn(
                        "flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-70 transition-opacity text-[10px]",
                        isSender ? "text-white/80 justify-end" : "text-muted-foreground justify-start"
                    )}>
                        <span>{timestamp}</span>
                        {isSender && status && (
                            <span className="ml-1">
                                {status === 'read' && '✓✓'}
                                {status === 'delivered' && '✓✓'}
                                {status === 'sent' && '✓'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
