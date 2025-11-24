'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, MessageCircle, User, LogOut, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signout } from '@/app/login/actions'
import { Button } from '@/components/ui/button'

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: MessageCircle, label: 'Messages', href: '/direct' },
    { icon: User, label: 'Profile', href: '/profile' },
]

import { ModeToggle } from '@/components/mode-toggle'

// ... imports ...

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-16 flex-col justify-between border-r bg-background px-2 py-4 md:w-64 md:px-4">
            <div className="space-y-8">
                <div className="flex items-center justify-center md:justify-start md:px-2">
                    <Instagram className="h-8 w-8 text-primary" />
                    <span className="ml-2 hidden text-xl font-bold md:block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Vibe Chat
                    </span>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-center rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground md:justify-start md:px-4",
                                    isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-6 w-6 md:mr-3" />
                                <span className="hidden md:block">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="space-y-2">
                <div className="flex w-full items-center justify-center md:justify-start md:px-4">
                    <ModeToggle />
                    <span className="ml-3 hidden text-sm font-medium md:block">Theme</span>
                </div>
                <form action={signout}>
                    <Button
                        variant="ghost"
                        className="flex w-full items-center justify-center md:justify-start md:px-4"
                    >
                        <LogOut className="h-6 w-6 md:mr-3" />
                        <span className="hidden md:block">Log out</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}
