'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function VerifyPage() {
    const [logs, setLogs] = useState<string[]>([])
    const supabase = createClient()

    const addLog = (msg: string) => setLogs(prev => [...prev, msg])

    useEffect(() => {
        const verify = async () => {
            addLog('Starting verification...')

            // Check Session
            const { data: { session } } = await supabase.auth.getSession()
            addLog(`Session: ${session ? 'Logged in as ' + session.user.email : 'Not logged in'}`)

            if (!session) {
                addLog('Please log in to verify RLS policies.')
                return
            }

            // Check Storage
            addLog('Checking Storage buckets...')
            const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
            if (bucketError) {
                addLog(`Error listing buckets: ${JSON.stringify(bucketError)}`)
            } else {
                addLog(`Buckets found: ${buckets.map(b => b.name).join(', ')}`)
                const avatarsBucket = buckets.find(b => b.name === 'avatars')
                addLog(`'avatars' bucket exists: ${!!avatarsBucket}`)
            }

            // Check Profiles RLS (List all)
            addLog('Checking visibility of all profiles...')
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('id, username')
                .limit(5)

            if (profilesError) {
                addLog(`Error fetching profiles: ${JSON.stringify(profilesError)}`)
            } else {
                addLog(`Profiles found (${profiles.length}): ${profiles.map(p => p.username).join(', ')}`)
            }

            addLog('Verification complete.')
        }

        verify()
    }, [])

    return (
        <div className="p-8 font-mono text-sm">
            <h1 className="text-xl font-bold mb-4">System Verification</h1>
            <div className="space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className="border-b pb-1">{log}</div>
                ))}
            </div>
        </div>
    )
}
