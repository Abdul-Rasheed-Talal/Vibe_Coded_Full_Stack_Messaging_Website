import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ChatWindow } from '@/components/chat/ChatWindow'

export default async function ChatPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch recipient profile
    const { data: recipient } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!recipient) {
        notFound()
    }

    // Fetch initial messages
    const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${recipient.id}),and(sender_id.eq.${recipient.id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true })

    return (
        <div className="h-full">
            <ChatWindow
                currentUser={user}
                recipient={recipient}
                initialMessages={messages || []}
            />
        </div>
    )
}
