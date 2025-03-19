'use client'

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createRecipeAction } from '@/actions/recipe/createRecipeAction'

type CreateRecipeDTO = {
  name: string
  cookingTime: number
  description: string[]
}

const schema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  cookingTime: z.number().int().positive().min(1, 'Cooking time is required'),
  description: z
    .array(z.string().min(1, 'Description is required'))
    .min(1, 'At least one description is required'),
})

const CreateRecipeForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecipeDTO>({
    resolver: zodResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'description' as never,
  })

  const onSubmit = async (data: CreateRecipeDTO) => {
    await createRecipeAction(data)
  }
  return (
    <div className="m-auto max-w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Enter recipe name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            {...register('cookingTime', {
              valueAsNumber: true,
            })}
            placeholder="Enter cooking time"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.cookingTime && (
            <p className="mt-1 text-xs text-red-500">{errors.cookingTime.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <textarea
                id={`description-${index}`}
                {...register(`description.${index}` as const)}
                placeholder="Enter recipe description"
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                &ndash;
              </button>
            </div>
          ))}
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
          )}
          <button
            type="button"
            onClick={() => append('')}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            + Add Description
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Create Recipe
        </button>
      </form>
    </div>
  )
}

export default CreateRecipeForm
