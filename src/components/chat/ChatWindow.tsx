'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Message = {
    id: number
    content: string
    sender_id: string
    created_at: string
}

type Profile = {
    id: string
    username: string
    full_name: string
    avatar_url: string | null
}

export function ChatWindow({
    currentUser,
    recipient,
    initialMessages,
}: {
    currentUser: any
    recipient: Profile
    initialMessages: Message[]
}) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    useEffect(() => {
        // Scroll to bottom on load and new messages
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        const channel = supabase
            .channel('chat_room')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${currentUser.id}`,
                },
                (payload) => {
                    if (payload.new.sender_id === recipient.id) {
                        setMessages((prev) => [...prev, payload.new as Message])
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [currentUser.id, recipient.id, supabase])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const tempId = Date.now()
        const optimisticMessage: Message = {
            id: tempId,
            content: newMessage,
            sender_id: currentUser.id,
            created_at: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, optimisticMessage])
        setNewMessage('')

        const { error } = await supabase.from('messages').insert({
            content: optimisticMessage.content,
            sender_id: currentUser.id,
            receiver_id: recipient.id,
        })

        if (error) {
            console.error('Error sending message:', error)
            // Rollback or show error (simplified for MVP)
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center border-b p-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={recipient.avatar_url || ''} />
                    <AvatarFallback>{recipient.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <p className="font-semibold">{recipient.username}</p>
                    <p className="text-xs text-muted-foreground">Active now</p>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                    const isMe = msg.sender_id === currentUser.id
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-foreground'
                                    }`}
                            >
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <form onSubmit={sendMessage} className="border-t p-4 flex gap-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message..."
                    className="flex-1 rounded-full"
                />
                <Button type="submit" size="icon" className="rounded-full" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}
