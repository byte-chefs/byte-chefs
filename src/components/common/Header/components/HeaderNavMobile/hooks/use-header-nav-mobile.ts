import { useCallback, useState } from 'react'

import { useSignOut } from '@/components/common/Header/hooks/use-sign-out'

export const useHeaderNavMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { signOut } = useSignOut()

  const signOutHandler = useCallback(() => {
    signOut()
    setIsMenuOpen(false)
  }, [signOut])

  const toggleMobileNav = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  const closeMobileNav = useCallback(() => setIsMenuOpen(false), [])

  return { isMenuOpen, signOutHandler, toggleMobileNav, closeMobileNav }
}
