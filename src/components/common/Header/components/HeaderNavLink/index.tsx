'use client'

import type { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof Link>

const HeaderNavLink: FC<Props> = (props) => {
  const { className, children, href, ...rest } = props

  const pathname = usePathname()

  const isCurrentPage = href === pathname

  return (
    <Link href={href} className={cn(`${isCurrentPage ? 'font-bold' : ''}`, className)} {...rest}>
      {children}
    </Link>
  )
}

export default HeaderNavLink
