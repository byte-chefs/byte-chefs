'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Soup, User, LogOut, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useHeader } from './hooks/use-header'
import ROUTES from '@/app/constants/routes'
import type { User as UserType } from '@prisma/client'

type Props = {
  user: UserType | null
}

export default function Header({ user }: Props) {
  const { isMenuOpen, setIsMenuOpen, handleSignOut } = useHeader()
  const pathname = usePathname()

  return (
    <header className="bg-background fixed inset-0 z-100 flex h-15 w-full items-center justify-center border-b drop-shadow-md md:h-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.HOMEPAGE} className="text-primary flex items-center space-x-2">
            <Soup className="h-8 w-8" />
            <span className="text-xl">Byte Chefs</span>
          </Link>

          <nav className="hidden space-x-6 uppercase md:flex">
            <Link
              href={ROUTES.RECIPES}
              className={`${pathname === ROUTES.RECIPES ? 'font-bold' : ''}`}
            >
              All Recipes
            </Link>
            <Link href={ROUTES.RANK} className={`${pathname === ROUTES.RANK ? 'font-bold' : ''}`}>
              Top chart
            </Link>
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-10 w-10 rounded-full">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background z-100">
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.PROFILE}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.MY_RECIPES}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>My Recipes</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href={ROUTES.LOGIN}>Login</Link>
              </Button>
            )}
          </div>

          <button className="z-1 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="bg-background fixed inset-0 flex h-screen flex-col gap-5 p-6">
            <Link
              href={ROUTES.RECIPES}
              className={`${pathname === ROUTES.RECIPES ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              All Recipes
            </Link>
            <Link
              href={ROUTES.RANK}
              className={`${pathname === ROUTES.RANK ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Top Chart
            </Link>
            {user ? (
              <>
                <Link href={ROUTES.PROFILE} onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                  className="mt-4 text-start"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)} className="mt-4">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
