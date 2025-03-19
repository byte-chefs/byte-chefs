'use client'

import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { useSignOut } from '@/components/common/Header/hooks/use-sign-out'

const SignOutButton = () => {
  const { signOut } = useSignOut()

  return (
    <DropdownMenuItem onClick={signOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  )
}

export default SignOutButton
