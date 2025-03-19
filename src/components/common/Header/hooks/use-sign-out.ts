import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { signOutAction } from '@/actions/auth/signOutAction'
import ROUTES from '@/app/constants/routes'

export const useSignOut = () => {
  const router = useRouter()

  const signOut = async () => {
    const result = await signOutAction()

    if (result.error) {
      toast.error(result.error)
    } else {
      router.push(ROUTES.HOMEPAGE)
      toast.success('You have been signed out successfully')
    }
  }

  return { signOut }
}
