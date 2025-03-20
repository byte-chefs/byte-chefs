import { FC } from 'react'

import HeaderLogo from '@/components/common/Header/components/HeaderLogo'
import HeaderNavDesktop from '@/components/common/Header/components/HeaderNavDesktop'
import HeaderNavMobile from '@/components/common/Header/components/HeaderNavMobile'
import UserMenu from '@/components/common/Header/components/UserMenu'
import { getUserInfoWithoutRedirect } from '@/actions/auth/getUserInfoWithoutRedirect'

const Header: FC = async () => {
  const user = await getUserInfoWithoutRedirect()

  return (
    <header className="bg-background fixed inset-0 z-99 flex h-15 w-full items-center justify-center border-b drop-shadow-md md:h-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          <HeaderNavDesktop />
          <UserMenu user={user} />
          <HeaderNavMobile user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header
