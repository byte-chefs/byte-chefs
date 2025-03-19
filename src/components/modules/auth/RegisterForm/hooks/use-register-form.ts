import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'

import { registerAction } from '@/actions/auth/registerAction'
import { registerSchema } from '@/schemas/auth/registerSchema'
import ROUTES from '@/app/constants/routes'

export const useRegisterForm = () => {
  const router = useRouter()

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    registerAction,
    zodResolver(registerSchema),
    {
      formProps: {
        defaultValues: {
          email: '',
          password: '',
          confirmPassword: '',
        },
      },
      actionProps: {
        onSuccess: () => {
          router.push(ROUTES.LOGIN)
          toast.success('Your account has been created successfully')
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  return { form, action, handleSubmitWithAction }
}
