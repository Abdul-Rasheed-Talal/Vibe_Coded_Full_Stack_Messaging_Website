import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="container max-w-2xl py-8">
            <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="text-4xl">{profile?.username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{profile?.username}</h1>
                    <p className="text-muted-foreground">{profile?.full_name}</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
            </div>
        </div>
    )
}
