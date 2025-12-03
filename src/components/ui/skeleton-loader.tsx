import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted/50", className)}
            {...props}
        />
    )
}

export function ChatSkeleton() {
    return (
        <div className="flex flex-col h-full w-full p-4 space-y-4">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 border-b border-border/40 pb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            {/* Messages Skeleton */}
            <div className="flex-1 space-y-6 py-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex w-full",
                            i % 2 === 0 ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-end gap-2 max-w-[70%]",
                                i % 2 === 0 ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                            <Skeleton
                                className={cn(
                                    "h-12 rounded-2xl",
                                    i % 3 === 0 ? "w-48" : i % 3 === 1 ? "w-64" : "w-32"
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Skeleton */}
            <div className="pt-4">
                <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
        </div>
    )
}

export function SidebarSkeleton() {
    return (
        <div className="flex flex-col h-full w-full py-6 px-3 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2 px-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-24 hidden lg:block" />
            </div>

            {/* Search */}
            <Skeleton className="h-10 w-full rounded-xl hidden lg:block" />

            {/* Nav Items */}
            <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-xl" />
                ))}
            </div>
        </div>
    )
}

export function ProfileSkeleton() {
    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <div className="w-full space-y-2 mt-8">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>
        </div>
    )
}
