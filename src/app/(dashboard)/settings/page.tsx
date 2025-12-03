"use client"

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Bell, Lock, Shield, Eye, Smartphone, LogOut } from 'lucide-react'
import { signout } from '@/app/login/actions'

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sound: false
    })

    const [privacy, setPrivacy] = useState({
        onlineStatus: true,
        readReceipts: true
    })

    return (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold glow-text mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your app preferences and privacy.</p>
            </div>

            <div className="grid gap-6">
                {/* Notifications Section */}
                <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Bell className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                            </div>
                            <Switch
                                checked={notifications.push}
                                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, push: c }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive digest emails</p>
                            </div>
                            <Switch
                                checked={notifications.email}
                                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, email: c }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Sound Effects</p>
                                <p className="text-sm text-muted-foreground">Play sounds for new messages</p>
                            </div>
                            <Switch
                                checked={notifications.sound}
                                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, sound: c }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Privacy Section */}
                <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <Lock className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold">Privacy</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Online Status</p>
                                <p className="text-sm text-muted-foreground">Show others when you're online</p>
                            </div>
                            <Switch
                                checked={privacy.onlineStatus}
                                onCheckedChange={(c) => setPrivacy(prev => ({ ...prev, onlineStatus: c }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Read Receipts</p>
                                <p className="text-sm text-muted-foreground">Show others when you've read their messages</p>
                            </div>
                            <Switch
                                checked={privacy.readReceipts}
                                onCheckedChange={(c) => setPrivacy(prev => ({ ...prev, readReceipts: c }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Section */}
                <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold">Account</h2>
                    </div>

                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">Change Password</span>
                                <span className="text-xs text-muted-foreground">Update your security credentials</span>
                            </div>
                        </Button>

                        <form action={signout}>
                            <Button variant="destructive" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
