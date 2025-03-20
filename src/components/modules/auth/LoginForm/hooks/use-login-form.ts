import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'

import { loginAction } from '@/actions/auth/loginAction'
import { loginSchema } from '@/schemas/auth/loginSchema'
import ROUTES from '@/app/constants/routes'

export const useLoginForm = () => {
  const router = useRouter()

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    loginAction,
    zodResolver(loginSchema),
    {
      formProps: {
        defaultValues: {
          email: '',
          password: '',
        },
      },
      actionProps: {
        onSuccess: () => {
          router.push(ROUTES.HOMEPAGE)
          router.refresh()
          toast.success('You have been logged in successfully')
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  return { form, action, handleSubmitWithAction }
}
