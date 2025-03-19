'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { User } from '@prisma/client'

import HeaderNavLink from '@/components/common/Header/components/HeaderNavLink'
import { useHeaderNavMobile } from './hooks/use-header-nav-mobile'
import { privateHeaderNavItems, publicHeaderNavItems } from '@/components/common/Header/data'
import ROUTES from '@/app/constants/routes'

type Props = {
  user: User | null
}

const HeaderNavMobile: FC<Props> = (props) => {
  const { user } = props

  const { isMenuOpen, signOutHandler, toggleMobileNav, closeMobileNav } = useHeaderNavMobile()

  return (
    <>
      <button className="z-1 md:hidden" onClick={toggleMobileNav}>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isMenuOpen && (
        <nav className="bg-background fixed inset-0 flex h-screen flex-col gap-5 p-6">
          {publicHeaderNavItems.map((item, index) => (
            <HeaderNavLink key={index} href={item.path} onClick={closeMobileNav}>
              {item.title}
            </HeaderNavLink>
          ))}
          {user ? (
            <>
              {privateHeaderNavItems.map((item, index) => (
                <HeaderNavLink key={index} href={item.path} onClick={closeMobileNav}>
                  {item.title}
                </HeaderNavLink>
              ))}
              <button onClick={signOutHandler} className="mt-4 text-start">
                Sign out
              </button>
            </>
          ) : (
            <Link href={ROUTES.LOGIN} onClick={closeMobileNav} className="mt-4">
              Login
            </Link>
          )}
        </nav>
      )}
    </>
  )
}

export default HeaderNavMobile
