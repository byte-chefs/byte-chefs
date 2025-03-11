'use client'

//TODO: decompose, extract types, add fields and styles

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createRecipeAction } from '@/actions/recipe/createRecipeAction'

type CreateRecipeDTO = {
  name: string
  cookingTime: number
  description: string
}

const schema = yup
  .object({
    name: yup.string().required('Recipe name is required'),
    cookingTime: yup.number().positive().integer().required('Cooking time is required'),
    description: yup.string().required('Description is required'),
  })
  .required()

const CreateRecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecipeDTO>({
    resolver: yupResolver(schema),
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
            {...register('cookingTime')}
            placeholder="Enter cooking time"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.cookingTime && (
            <p className="mt-1 text-xs text-red-500">{errors.cookingTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Enter recipe description"
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
          )}
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
