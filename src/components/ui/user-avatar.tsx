'use client'

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
    src?: string | null
    fallback?: string
    status?: 'online' | 'offline' | 'idle' | 'dnd'
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function UserAvatar({
    src,
    fallback,
    status,
    size = 'md',
    className,
    ...props
}: UserAvatarProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
        xl: "h-20 w-20"
    }

    return (
        <div className="relative inline-block">
            <Avatar className={cn(sizeClasses[size], className)} {...props}>
                <AvatarImage src={src || ''} className="object-cover" />
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {fallback?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            {/* Status Indicator */}
            {status && (
                <span className={cn(
                    "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
                    size === 'sm' ? "h-2.5 w-2.5" : "h-3.5 w-3.5",
                    status === 'online' && "bg-green-500",
                    status === 'idle' && "bg-yellow-500",
                    status === 'dnd' && "bg-red-500",
                    status === 'offline' && "bg-slate-400"
                )} />
            )}
        </div>
    )
}
