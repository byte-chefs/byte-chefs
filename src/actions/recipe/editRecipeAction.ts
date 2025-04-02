'use server'

import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { getUserInfo } from '@/actions/auth/getUserInfo'
import { SupabaseError } from '@/lib/errors/supabase-error'
import { editRecipeSchema } from '@/schemas/recipe/editRecipeSchema'

export const editRecipeAction = actionClient
  .schema(editRecipeSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { id, name, cookingTime, description, difficulty, ingredients, status, tags, photo } =
      parsedInput

    const user = await getUserInfo()

    if (!user) {
      throw new Error('User is not authenticated')
    }

    try {
      const existingRecipe = await prisma.recipe.findUnique({
        where: { id },
        include: { ingredients: true, tags: true },
      })

      if (!existingRecipe) {
        throw new Error('Recipe not found')
      }

      if (existingRecipe.userId !== user.id) {
        throw new Error('You do not have permission to edit this recipe')
      }

      const recipeCalories = ingredients.reduce((acc, ingredient) => {
        acc.calories += Number(ingredient.calories);
        acc.protein += Number(ingredient.protein);
        acc.carbs += Number(ingredient.carbs);
        acc.fat += Number(ingredient.fat);

        return acc;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0 })

      const existingIngredientIds = existingRecipe.ingredients.map((ingregient) => ingregient.id)
      const updatedIngredientIds = ingredients
        .filter((ingregient) => ingregient.id)
        .map((ingregient) => ingregient.id)

      const ingredientsToDelete = existingIngredientIds.filter(
        (id) => !updatedIngredientIds.includes(id)
      )

      const existingTagIds = existingRecipe.tags.map((tag) => tag.tagId)
      const updatedTagIds = tags ? tags.map((tag) => parseInt(tag.id.toString())) : []

      const tagsToRemove = existingTagIds.filter((id) => !updatedTagIds.includes(id))
      const tagsToAdd = updatedTagIds.filter((id) => !existingTagIds.includes(id))

      const updatedRecipe = await prisma.$transaction(async (tx) => {
        if (ingredientsToDelete.length > 0) {
          await tx.ingredient.deleteMany({
            where: {
              id: { in: ingredientsToDelete },
            },
          })
        }

        if (tagsToRemove.length > 0) {
          await tx.recipeTag.deleteMany({
            where: {
              recipeId: id,
              tagId: { in: tagsToRemove },
            },
          })
        }

        const updated = await tx.recipe.update({
          where: { id },
          data: {
            name,
            cookingTime,
            description,
            difficulty,
            photo,
            calories: recipeCalories.calories || 0,
            protein: recipeCalories.protein || 0,
            carbs: recipeCalories.carbs || 0,
            fat: recipeCalories.fat || 0,
            status,
            ...(tags && {
              tags: {
                create: tagsToAdd.map((tagId) => ({
                  tag: {
                    connect: { id: tagId },
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

        for (const ingredient of ingredients) {
          if (ingredient.id) {
            await tx.ingredient.update({
              where: { id: ingredient.id },
              data: {
                foodId: ingredient.foodId,
                servingId: ingredient.servingId,
                quantity: ingredient.quantity,
                name: ingredient.name,
                calories: ingredient.calories,
                protein: ingredient.protein,
                carbs: ingredient.carbs,
                fat: ingredient.fat,
              },
            })
          } else {
            await tx.ingredient.create({
              data: {
                foodId: ingredient.foodId,
                servingId: ingredient.servingId,
                quantity: ingredient.quantity,
                name: ingredient.name,
                calories: ingredient.calories,
                protein: ingredient.protein,
                carbs: ingredient.carbs,
                fat: ingredient.fat,
                recipeId: Number(id),
              },
            })
          }
        }
        return updated
      })

      return { success: true, recipe: updatedRecipe }
    } catch (error) {
      console.error('Error updating recipe:', error)
      if (error instanceof SupabaseError) {
        throw error
      }
      throw new Error('Failed to update recipe')
    }
  })
