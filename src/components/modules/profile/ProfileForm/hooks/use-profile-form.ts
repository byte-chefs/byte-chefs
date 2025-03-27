import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'

import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'
import { updateProfileAction } from '@/actions/profile/updateProfile'
import { profileSchema } from '@/schemas/profile/profileSchema'
import ROUTES from '@/app/constants/routes'

export const useProfileForm = () => {
  const router = useRouter()

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateProfileAction,
    zodResolver(profileSchema),
    {
      formProps: {
        defaultValues: {
          firstName: '',
          lastName: '',
          aboutMe: '',
          profileImage: '',
          allergens: [],
          userId: undefined,
        },
      },
      actionProps: {
        onSuccess: () => {
          router.push(ROUTES.PROFILE)
          router.refresh()
          toast.success('Your profile has been updated successfully')
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  useEffect(() => {
    async function loadUser() {
      const userData = await getAuthUserInfo()

      if (!userData) {
        router.push(ROUTES.LOGIN)
        return
      }

      form.reset({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        aboutMe: userData.aboutMe || '',
        profileImage: userData.profileImage || '',
        allergens: userData.allergens || [],
        userId: userData.id || undefined,
      })
    }

    loadUser()
  }, [form, router])

  return { form, action, handleSubmitWithAction }
}
