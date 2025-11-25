'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login, signup, signInWithGoogle } from '@/app/login/actions'
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
        <div className="w-full p-8 md:p-10 space-y-8 bg-zinc-950/70 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

            <div className="space-y-2 text-center relative z-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                </h1>
                <p className="text-zinc-400">
                    {isLogin
                        ? 'Enter your credentials to access your account'
                        : 'Enter your information to create an account'}
                </p>
            </div>

            {/* Toggle */}
            <div className="flex p-1 bg-zinc-900/80 rounded-xl border border-white/5 relative z-10">
                <Button
                    variant="ghost"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 rounded-lg text-sm font-medium h-10 transition-all ${isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Login
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 rounded-lg text-sm font-medium h-10 transition-all ${!isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Sign Up
                </Button>
            </div>

            {/* Google Button */}
            <form action={async () => { await signInWithGoogle() }} className="relative z-10">
                <Button variant="outline" className="w-full h-12 text-base font-medium bg-white text-black hover:bg-zinc-200 border-none rounded-xl transition-all flex items-center justify-center gap-3" type="submit">
                    <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Sign in with Google
                </Button>
            </form>

            <div className="relative py-2 z-10">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                    <span className="bg-transparent px-4 text-zinc-500 font-medium">
                        Or continue with
                    </span>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-4 relative z-10">
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
                                        className="h-12 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="username"
                                        placeholder="Username"
                                        required={!isLogin}
                                        disabled={isPending}
                                        className="h-12 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 rounded-xl"
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
                                className="h-12 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 rounded-xl"
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
                                className="h-12 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 rounded-xl"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {error && (
                    <div className="p-3 text-sm font-medium text-red-400 bg-red-900/20 border border-red-900/30 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl transition-all" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
