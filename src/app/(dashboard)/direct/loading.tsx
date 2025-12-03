import { ChatSkeleton } from "@/components/ui/skeleton-loader"

export default function ChatLoading() {
    return (
        <div className="h-full w-full bg-background/50 backdrop-blur-sm">
            <ChatSkeleton />
        </div>
    )
}
