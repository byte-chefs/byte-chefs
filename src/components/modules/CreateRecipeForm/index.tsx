'use client'

import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRecipeAction } from '@/actions/recipe/createRecipeAction'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import ROUTES from '@/app/constants/routes'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { createRecipeSchema } from '@/schemas/recipe/createRecipeSchema'

const CreateRecipeForm = () => {
  const router = useRouter()

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createRecipeAction,
    zodResolver(createRecipeSchema),
    {
      formProps: {
        defaultValues: {
          name: '',
          cookingTime: 0,
          description: [],
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success('The recipe was created')
          router.push(ROUTES.RECIPES)
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'description' as never,
  })

  return (
    <div className="m-auto max-w-[400px]">
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? +e.target.value : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Step by step description</FormLabel>
            <div className="flex flex-col gap-2">
              {fields.map((item, index) => (
                <div key={item.id} className="flex w-full items-center space-x-2">
                  <p>{index + 1}</p>
                  <FormField
                    control={form.control}
                    name={`description.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)} className="bg-red-500">
                    -
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" onClick={() => append('')} className="mt-2">
              +
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={action.isExecuting}>
            {action.isExecuting ? <Spinner /> : 'Create'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateRecipeForm
