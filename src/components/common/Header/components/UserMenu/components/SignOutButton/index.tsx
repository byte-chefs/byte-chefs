'use client'

import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { useSignOut } from '@/components/common/Header/hooks/use-sign-out'

const SignOutButton = () => {
  const { signOut } = useSignOut()

  return (
    <DropdownMenuItem asChild>
      <button
        className="hover:bg-destructive/80 text-destructive w-full transition-all duration-150 ease-in hover:text-white"
        onClick={signOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </button>
    </DropdownMenuItem>
  )
}

export default SignOutButton
