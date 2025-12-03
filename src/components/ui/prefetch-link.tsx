'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface PrefetchLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    title?: string
}

export function PrefetchLink({ children, href, ...props }: PrefetchLinkProps) {
    const router = useRouter()

    const prefetch = () => {
        if (typeof href === 'string') {
            router.prefetch(href)
        }
    }

    return (
        <Link
            href={href}
            {...props}
            onMouseEnter={prefetch}
            onTouchStart={prefetch}
        >
            {children}
        </Link>
    )
}
