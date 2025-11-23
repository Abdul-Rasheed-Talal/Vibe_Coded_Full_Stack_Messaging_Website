import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function DirectPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch recent conversations (simplified: just list all users for now or query distinct messages)
    // For MVP, we'll just show a "Start a chat" message or list recent users if we had a conversations table.
    // Let's query distinct sender/receivers from messages.

    const { data: messages } = await supabase
        .from('messages')
        .select('sender_id, receiver_id, created_at, content')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

    // Extract unique user IDs involved in chats
    const userIds = new Set<string>()
    messages?.forEach(msg => {
        if (msg.sender_id !== user.id) userIds.add(msg.sender_id)
        if (msg.receiver_id !== user.id) userIds.add(msg.receiver_id)
    })

    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', Array.from(userIds))

    return (
        <div className="container max-w-2xl py-8">
            <h1 className="mb-6 text-2xl font-bold">Messages</h1>
            <div className="space-y-2">
                {profiles?.map((profile) => (
                    <Link
                        key={profile.id}
                        href={`/direct/${profile.id}`}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                        <Avatar>
                            <AvatarImage src={profile.avatar_url || ''} />
                            <AvatarFallback>{profile.username[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{profile.username}</p>
                            <p className="text-sm text-muted-foreground">Open conversation</p>
                        </div>
                    </Link>
                ))}
                {profiles?.length === 0 && (
                    <p className="text-center text-muted-foreground">No conversations yet.</p>
                )}
            </div>
        </div>
    )
}
