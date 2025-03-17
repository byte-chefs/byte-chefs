'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import { loginAction } from '@/actions/auth/loginAction'
import { loginSchema } from '@/schemas/auth/loginSchema'
import ROUTES from '@/app/constants/routes'

export default function LoginPage() {
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
          toast.success('You have been logged in successfully')
          router.push(ROUTES.HOMEPAGE)
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  return (
    <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={action.isExecuting}>
                {action.isExecuting ? <Spinner /> : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full text-center">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
