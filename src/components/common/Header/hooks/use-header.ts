import { useState } from 'react'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'
import { signOutAction } from '@/actions/auth/signOutAction'
import ROUTES from '@/app/constants/routes'

export const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const result = await signOutAction()

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('You have been logged out successfully')
      redirect(ROUTES.HOMEPAGE)
    }
  }

  return { isMenuOpen, setIsMenuOpen, handleSignOut }
}
