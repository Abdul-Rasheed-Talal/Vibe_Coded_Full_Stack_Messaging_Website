'use client'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'

type MessageBubbleProps = {
    message: {
        id: number | string
        content: string
        created_at: string
        attachments?: { type: 'image' | 'file' | 'audio'; url: string; name: string }[]
    }
    isMe: boolean
    showAvatar?: boolean
}

export function MessageBubble({ message, isMe, showAvatar }: MessageBubbleProps) {
    return (
        <div
            className={cn(
                "flex w-full mb-2",
                isMe ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "relative max-w-[75%] px-4 py-3 text-sm rounded-2xl shadow-sm",
                    isMe
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground border border-border/50 rounded-tl-sm"
                )}
            >
                {/* Attachments */}
                {message.attachments?.map((att, i) => (
                    <div key={i} className="mb-2">
                        {att.type === 'image' ? (
                            <img
                                src={att.url}
                                alt="attachment"
                                className="max-w-full rounded-md"
                                loading="lazy"
                            />
                        ) : att.type === 'audio' ? (
                            <div className="flex items-center gap-2 min-w-[200px]">
                                <audio controls src={att.url} className="w-full h-8" />
                            </div>
                        ) : (
                            <a
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded bg-background/10 hover:bg-background/20 transition-colors"
                            >
                                <span className="text-xs underline truncate">{att.name}</span>
                            </a>
                        )}
                    </div>
                ))}

                {/* Text Content */}
                {message.content && (
                    <p className="leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                )}

                {/* Timestamp */}
                <span className={cn(
                    "text-[10px] mt-1 block w-full text-right opacity-70",
                    isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                    {format(new Date(message.created_at), 'h:mm a')}
                </span>
            </div>
        </div>
    )
}
