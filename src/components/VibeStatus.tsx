'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Smile, Zap, Coffee, Music, Moon, Sun } from 'lucide-react'
import { updateVibe, getVibe } from '@/app/actions/vibe'
import { useRouter } from 'next/navigation'

const VIBES = [
    { icon: <Zap className="h-4 w-4 text-yellow-400" />, label: 'Energetic', emoji: '⚡' },
    { icon: <Coffee className="h-4 w-4 text-orange-400" />, label: 'Focused', emoji: '☕' },
    { icon: <Music className="h-4 w-4 text-purple-400" />, label: 'Vibing', emoji: '🎵' },
    { icon: <Moon className="h-4 w-4 text-blue-400" />, label: 'Chilling', emoji: '🌙' },
    { icon: <Sun className="h-4 w-4 text-amber-400" />, label: 'Happy', emoji: '☀️' },
]

export function VibeStatus({ collapsed }: { collapsed?: boolean }) {
    const [currentVibe, setCurrentVibe] = useState(VIBES[0])
    const router = useRouter()

    useEffect(() => {
        getVibe().then(vibeLabel => {
            if (vibeLabel) {
                const found = VIBES.find(v => v.label === vibeLabel)
                if (found) setCurrentVibe(found)
            }
        })
    }, [])

    const handleSetVibe = async (vibe: typeof VIBES[0]) => {
        setCurrentVibe(vibe)
        await updateVibe(vibe.label)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={`w-full ${collapsed ? 'justify-center' : 'justify-start px-4'} h-10 border border-border/50 bg-card/50`}
                >
                    <span className="text-lg">{currentVibe.emoji}</span>
                    {!collapsed && <span className="ml-2 text-sm font-medium">{currentVibe.label}</span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side={collapsed ? 'right' : 'bottom'}>
                <DropdownMenuLabel>Set your Vibe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {VIBES.map((vibe) => (
                    <DropdownMenuItem
                        key={vibe.label}
                        onClick={() => handleSetVibe(vibe)}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <span>{vibe.emoji}</span>
                        <span>{vibe.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
