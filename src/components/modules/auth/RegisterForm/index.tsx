'use client'

import { Form } from '@/components/ui/Form'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import FormFieldGroup from '@/components/common/FormFieldGroup'
import { useRegisterForm } from './hooks/use-register-form'

const RegisterForm = () => {
  const { form, action, handleSubmitWithAction } = useRegisterForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormFieldGroup control={form.control} name="email" type="email" label="Email" />
        <FormFieldGroup control={form.control} name="password" type="password" label="Password" />
        <FormFieldGroup
          control={form.control}
          name="confirmPassword"
          type="password"
          label="Confirm password"
        />
        <Button type="submit" className="w-full" disabled={action.isPending}>
          {action.isPending ? <Spinner /> : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
