import { FC } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import type { User as UserType } from '@prisma/client'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import HeaderNavLink from '@/components/common/Header/components/HeaderNavLink'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import SignOutButton from './components/SignOutButton'
import ROUTES from '@/app/constants/routes'
import { privateHeaderNavItems } from '../../data'

type Props = {
  user: UserType | null
}

const UserMenu: FC<Props> = (props) => {
  const { user } = props

  return (
    <div className="hidden items-center space-x-4 md:flex">
      {user ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user.profileImage || undefined} />
                <AvatarFallback>
                  <User className="text-foreground" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background z-100">
            {privateHeaderNavItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <HeaderNavLink href={item.path}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </HeaderNavLink>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href={ROUTES.LOGIN}>Login</Link>
        </Button>
      )}
    </div>
  )
}

export default UserMenu
