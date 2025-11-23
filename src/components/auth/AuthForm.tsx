'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login, signup } from '@/app/login/actions'
import { Loader2 } from 'lucide-react'

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const action = isLogin ? login : signup
            const result = await action(formData)
            if (result?.error) {
                setError(result.error)
            }
        })
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl border shadow-sm">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                </h1>
                <p className="text-muted-foreground">
                    {isLogin
                        ? 'Enter your credentials to access your account'
                        : 'Enter your information to create an account'}
                </p>
            </div>

            <div className="flex p-1 bg-muted rounded-lg">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Sign Up
                </button>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                    >
                        {!isLogin && (
                            <>
                                <div className="space-y-2">
                                    <Input
                                        name="fullName"
                                        placeholder="Full Name"
                                        required={!isLogin}
                                        disabled={isPending}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="username"
                                        placeholder="Username"
                                        required={!isLogin}
                                        disabled={isPending}
                                    />
                                </div>
                            </>
                        )}
                        <div className="space-y-2">
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                disabled={isPending}
                                minLength={6}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isLogin ? 'Signing in...' : 'Creating account...'}
                        </>
                    ) : (
                        <>{isLogin ? 'Sign In' : 'Sign Up'}</>
                    )}
                </Button>
            </form>
        </div>
    )
}
