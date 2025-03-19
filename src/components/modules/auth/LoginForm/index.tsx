'use client'

import { Form } from '@/components/ui/Form'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import FormFieldGroup from '@/components/common/FormFieldGroup'
import { useLoginForm } from './hooks/use-login-form'

const LoginForm = () => {
  const { form, action, handleSubmitWithAction } = useLoginForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormFieldGroup control={form.control} name="email" type="email" label="Email" />
        <FormFieldGroup control={form.control} name="password" type="password" label="Password" />
        <Button type="submit" className="w-full" disabled={action.isPending}>
          {action.isPending ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
