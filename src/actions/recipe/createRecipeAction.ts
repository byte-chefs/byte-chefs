'use server'

import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { getUserInfo } from '@/actions/auth/getUserInfo'
import { SupabaseError } from '@/lib/errors/supabase-error'
import { createRecipeSchema } from '@/schemas/recipe/createRecipeSchema'

export const createRecipeAction = actionClient
  .schema(createRecipeSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { name, cookingTime, description } = parsedInput
    const user = await getUserInfo()

    if (!user) {
      throw new Error('User is not authenticated')
    }

    try {
      await prisma.recipe.create({
        data: {
          name,
          cookingTime,
          description: description as never,
          status: 'Published',
          userId: user.id,
        },
      })
    } catch (error) {
      if (error instanceof SupabaseError) {
        throw error
      }
      throw new Error('Failed to create recipe')
    }
  })
