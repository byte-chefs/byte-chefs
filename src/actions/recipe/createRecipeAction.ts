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
    const { name, cookingTime, description, difficulty, ingredients, status, tags, photo } =
      parsedInput
    const user = await getAuthUserInfo()
    if (!user) {
      throw new Error('User is not authenticated')
    }

    const recipeCalories = ingredients.reduce((acc, ingredient) => {
      acc.calories += ingredient.calories;
      acc.protein += ingredient.protein;
      acc.carbs += ingredient.carbs;
      acc.fat += ingredient.fat;

      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })

    try {
      const recipe = await prisma.recipe.create({
        data: {
          name,
          cookingTime,
          description,
          photo,
          difficulty,
          status: status,
          calories: recipeCalories.calories || 0,
          protein: recipeCalories.protein || 0,
          carbs: recipeCalories.carbs || 0,
          fat: recipeCalories.fat || 0,
          userId: user.id,
          ingredients: {
            create: ingredients.map((ingredient) => ({
              foodId: ingredient.foodId,
              servingId: ingredient.servingId,
              quantity: ingredient.quantity,
              name: ingredient.name,
              calories: ingredient.calories,
              protein: ingredient.protein,
              carbs: ingredient.carbs,
              fat: ingredient.fat,
            })),
          },
          ...(tags &&
            tags.length > 0 && {
              tags: {
                create: tags.map((tag) => ({
                  tag: {
                    connect: {
                      id: Number(tag.id),
                    },
                  },
                })),
              },
            }),
        },
        include: {
          ingredients: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
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
