import Link from 'next/link'
import { Soup } from 'lucide-react'

import ROUTES from '@/app/constants/routes'

const HeaderLogo = () => {
  return (
    <Link
      href={ROUTES.HOMEPAGE}
      className="dark:text-primary-lighter hover:dark:text-primary-lighter/80 text-primary/90 hover:text-primary flex items-center space-x-2"
    >
      <Soup className="h-8 w-8" />
      <span className="text-xl">Byte Chefs</span>
    </Link>
  )
}

export default HeaderLogo
