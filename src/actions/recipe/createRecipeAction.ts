'use server'

import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'
import { SupabaseError } from '@/lib/errors/supabase-error'
import { createRecipeSchema } from '@/schemas/recipe/createRecipeSchema'

export const createRecipeAction = actionClient
  .schema(createRecipeSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { name, cookingTime, description, difficulty, ingredients, status, tags, photo } = parsedInput
    const user = await getAuthUserInfo()

    if (!user) {
      throw new Error('User is not authenticated')
    }

    try {
      const recipe = await prisma.recipe.create({
        data: {
          name,
          cookingTime,
          description,
          photo,
          difficulty,
          status: status,
          userId: user.id,
          ingredients: {
            create: ingredients.map(ingredient => ({
              foodId: ingredient.foodId,
              servingId: ingredient.servingId,
              quantity: ingredient.quantity,
              name: ingredient.name,
            }))
          },
          ...(tags && tags.length > 0 && {
            tags: {
              create: tags.map(tag => ({
                tag: {
                  connect: {
                    id: Number(tag.id)
                  }
                }
              }))
            }
          })
        },
        include: {
          ingredients: true,
          tags: {
            include: {
              tag: true
            }
          }
        }
      })
      return { success: true, recipe }
    } catch (error) {
      console.error('Error creating recipe:', error)
      if (error instanceof SupabaseError) {
        throw error
      }
      throw new Error('Failed to create recipe')
    }
  })