import { SidebarSkeleton } from "@/components/ui/skeleton-loader"

export default function DashboardLoading() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar Skeleton */}
            <aside className="hidden md:flex w-20 lg:w-80 border-r border-border/40 bg-card/30 backdrop-blur-xl flex-col z-20 shrink-0 h-full">
                <SidebarSkeleton />
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1 relative overflow-hidden flex flex-col pt-16 md:pt-0 h-full bg-background/50 backdrop-blur-3xl">
                <div className="flex-1 p-6 grid grid-cols-1 gap-6">
                    <div className="h-32 w-full bg-muted/20 rounded-2xl animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-muted/20 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
