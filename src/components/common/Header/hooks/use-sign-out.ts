import { toast } from 'react-toastify'

import { signOutAction } from '@/actions/auth/signOutAction'

export const useSignOut = () => {
  const signOut = async () => {
    const result = await signOutAction()

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('You have been signed out successfully')
    }
  }

  return { signOut }
}
