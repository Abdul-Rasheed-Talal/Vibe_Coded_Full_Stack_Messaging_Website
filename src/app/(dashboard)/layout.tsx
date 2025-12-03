'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageSquare, User, Settings, LogOut, Menu, Search, Home as HomeIcon, X, BellOff, Ban, Flag } from 'lucide-react'
import { useTheme } from 'next-themes'
import { signout } from '@/app/login/actions'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { VibeStatus } from '@/components/VibeStatus'
import { PrefetchLink } from '@/components/ui/prefetch-link'
import { NotificationProvider, useNotifications } from '@/components/providers/NotificationProvider'
import { Toaster } from 'sonner'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <NotificationProvider>
            <DashboardContent>{children}</DashboardContent>
            <Toaster theme="dark" position="top-right" />
        </NotificationProvider>
    )
}

function DashboardContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [showRightPanel, setShowRightPanel] = useState(true)
    const [collapsed, setCollapsed] = useState(false)
    const { unreadCount } = useNotifications()

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                    <span className="font-bold text-lg tracking-tighter">Vibe Chat</span>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[80%] sm:w-[385px] p-0">
                        <SidebarContent pathname={pathname} theme={theme} setTheme={setTheme} unreadCount={unreadCount} />
                    </SheetContent>
                </Sheet>
            </header>

            {/* Desktop/Tablet Sidebar (Left Column) */}
            <aside className={`hidden md:flex ${collapsed ? 'w-20' : 'w-20 lg:w-80'} border-r border-border bg-card flex-col z-20 transition-all duration-300 shrink-0 h-full`}>
                <SidebarContent pathname={pathname} theme={theme} setTheme={setTheme} collapsed={collapsed} setCollapsed={setCollapsed} unreadCount={unreadCount} />
            </aside>

            {/* Main Content (Center Column) */}
            <main className="flex-1 relative overflow-hidden flex flex-col pt-16 md:pt-0 pb-16 md:pb-0 h-full bg-background">
                <div className="flex-1 z-10 overflow-hidden grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-0 h-full">
                    <div className="flex flex-col overflow-hidden h-full relative">
                        {/* Panel Toggle Button (Visible when panel is closed) */}
                        {!showRightPanel && (
                            <div className="absolute top-4 right-4 z-50">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full shadow-lg bg-card/50 backdrop-blur-md border border-border/50 hover:bg-primary/20"
                                    onClick={() => setShowRightPanel(true)}
                                >
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </div>
                        )}
                        {children}
                    </div>
                    {showRightPanel && (
                        <aside className="hidden xl:flex w-80 border-l border-border/40 bg-card/30 backdrop-blur-xl flex-col p-6 z-20 h-full overflow-y-auto shrink-0 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-xl glow-text">Details</h3>
                                <Button variant="ghost" size="icon" onClick={() => setShowRightPanel(false)} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-8">
                                {/* Search in Chat */}
                                <div>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder="Search in chat..."
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h4>
                                    <div className="flex gap-2 justify-between">
                                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50" title="Mute Notifications">
                                            <BellOff className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50" title="Block User">
                                            <Ban className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/50 hover:bg-yellow-500/10 hover:text-yellow-500 hover:border-yellow-500/50" title="Report">
                                            <Flag className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Pinned Messages */}
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Pinned Messages</h4>
                                    <div className="p-3 rounded-xl bg-muted/20 border border-border/30 text-sm text-muted-foreground italic text-center">
                                        No pinned messages
                                    </div>
                                </div>

                                {/* Shared Media */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shared Media</h4>
                                        <Button variant="link" size="sm" className="text-xs h-auto p-0 text-primary">View All</Button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} className="aspect-square rounded-xl bg-muted/30 border border-white/5 hover:scale-105 transition-transform cursor-pointer overflow-hidden relative group">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Members */}
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Members</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                                                <div className="h-full w-full rounded-full bg-card" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">You</p>
                                                <p className="text-xs text-muted-foreground">Online</p>
                                            </div>
                                            <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">ADMIN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border/40 flex items-center justify-around z-50 px-4">
                <Link href="/direct" className={`flex flex-col items-center p-1 rounded-lg ${pathname.startsWith('/direct') ? 'text-primary' : 'text-muted-foreground'} relative`}>
                    <div className="relative">
                        <MessageSquare className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background" />
                        )}
                    </div>
                    <span className="text-[10px] mt-1">Chats</span>
                </Link>
                <Link href="/profile" className={`flex flex-col items-center p-1 rounded-lg ${pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}>
                    <User className="h-5 w-5" />
                    <span className="text-[10px] mt-1">Profile</span>
                </Link>

                <form action={signout}>
                    <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1 text-destructive">
                        <LogOut className="h-5 w-5" />
                        <span className="text-[10px] mt-1">Logout</span>
                    </Button>
                </form>
            </nav>
        </div>
    )
}

function SidebarContent({ pathname, theme, setTheme, collapsed, setCollapsed, unreadCount = 0 }: { pathname: string, theme: string | undefined, setTheme: (theme: string) => void, collapsed?: boolean, setCollapsed?: (v: boolean) => void, unreadCount?: number }) {
    return (
        <div className="flex flex-col h-full w-full py-6">
            <div className={`mb-8 px-4 flex items-center gap-2 ${collapsed ? 'justify-center' : 'lg:px-6 justify-center lg:justify-start'} shrink-0 transition-all duration-300`}>
                <div className="h-8 w-8 rounded-full bg-primary shrink-0" />
                {!collapsed && <span className="font-bold text-xl tracking-tighter hidden lg:block whitespace-nowrap overflow-hidden">Vibe Chat</span>}
            </div>

            {!collapsed && (
                <div className="px-4 mb-6 hidden lg:block shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search vibes..."
                            className="w-full bg-muted/50 border-none rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                    </div>
                </div>
            )}

            <div className="px-3 mb-2">
                <VibeStatus collapsed={collapsed} />
            </div>

            <nav className="flex-1 space-y-2 px-3 overflow-y-auto overflow-x-hidden">
                <NavItem href="/home" icon={<HomeIcon />} label="Home" active={pathname.startsWith('/home')} collapsed={collapsed} />
                <NavItem href="/direct" icon={<MessageSquare />} label="Chats" active={pathname.startsWith('/direct')} collapsed={collapsed} badge={unreadCount} />
                <NavItem href="/profile" icon={<User />} label="Profile" active={pathname === '/profile'} collapsed={collapsed} />
                <NavItem href="/settings" icon={<Settings />} label="Settings" active={pathname === '/settings'} collapsed={collapsed} />
            </nav>

            <div className="mt-auto px-3 space-y-2 shrink-0">
                {setCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`hidden lg:flex w-full ${collapsed ? 'justify-center' : 'justify-start px-4'}`}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Menu className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="ml-3">Collapse</span>}
                    </Button>
                )}

                <form action={signout}>
                    <Button variant="ghost" className={`w-full ${collapsed ? 'justify-center' : 'justify-center lg:justify-start lg:px-4'} text-destructive hover:text-destructive`}>
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="ml-3 hidden lg:block">Logout</span>}
                    </Button>
                </form>
            </div>
        </div>
    )
}

function NavItem({ href, icon, label, active, collapsed, badge }: { href: string, icon: React.ReactNode, label: string, active: boolean, collapsed?: boolean, badge?: number }) {
    return (
        <PrefetchLink href={href}>
            <Button
                variant={active ? "secondary" : "ghost"}
                className={`w-full ${collapsed ? 'justify-center' : 'justify-center lg:justify-start lg:px-4'} h-12 lg:h-10 ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'} relative`}
                title={collapsed ? label : undefined}
            >
                <div className="relative">
                    {icon}
                    {badge && badge > 0 ? (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse">
                            {badge > 9 ? '9+' : badge}
                        </span>
                    ) : null}
                </div>
                {!collapsed && <span className="hidden lg:block ml-3 font-medium">{label}</span>}
            </Button>
        </PrefetchLink>
    )
}
