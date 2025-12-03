'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { getTotalUnreadCount } from '@/app/actions/chat'
import { playNotificationSound } from '@/lib/sounds'

type NotificationContextType = {
    unreadCount: number
    refreshUnreadCount: () => Promise<void>
    settings: NotificationSettings
    updateSettings: (settings: Partial<NotificationSettings>) => void
}

type NotificationSettings = {
    push: boolean
    email: boolean
    sound: boolean
}

const defaultSettings: NotificationSettings = {
    push: true,
    email: true,
    sound: true
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children, initialUnreadCount = 0 }: { children: React.ReactNode, initialUnreadCount?: number }) {
    const [unreadCount, setUnreadCount] = useState(initialUnreadCount)
    const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
    const pathname = usePathname()
    const supabase = createClient()
    const audioRef = useRef<HTMLAudioElement | null>(null)

    // Load settings from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('vibe-notification-settings')
        if (saved) {
            try {
                setSettings(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse settings', e)
            }
        }
        // Initialize audio
        audioRef.current = new Audio('/sounds/notification.mp3')
    }, [])

    const updateSettings = (newSettings: Partial<NotificationSettings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings }
            localStorage.setItem('vibe-notification-settings', JSON.stringify(updated))
            return updated
        })
    }

    const refreshUnreadCount = async () => {
        const count = await getTotalUnreadCount()
        setUnreadCount(count)
    }

    useEffect(() => {
        refreshUnreadCount()

        // Subscribe to new messages
        const channel = supabase
            .channel('global_notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                async (payload) => {
                    const newMessage = payload.new as any

                    // Check if message is for me
                    const { data: { user } } = await supabase.auth.getUser()
                    if (!user || newMessage.receiver_id !== user.id) return

                    // If I'm currently in this chat, don't notify (or maybe just sound?)
                    // Pathname format: /direct/[conversationId]
                    const isInChat = pathname === `/direct/${newMessage.conversation_id}`

                    if (!isInChat) {
                        // Increment unread count
                        setUnreadCount(prev => prev + 1)

                        // Show toast if enabled
                        if (settings.push) {
                            toast.message('New Message', {
                                description: newMessage.content || 'Sent an attachment',
                                action: {
                                    label: 'View',
                                    onClick: () => window.location.href = `/direct/${newMessage.conversation_id}`
                                }
                            })
                        }

                        // Play sound if enabled
                        if (settings.sound) {
                            playNotificationSound()
                        }
                    } else {
                        // Even if in chat, maybe refresh unread count just in case (though it should be read)
                        // Actually if in chat, we assume it's read immediately or handled by ChatWindow
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [pathname, settings])

    return (
        <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount, settings, updateSettings }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}
