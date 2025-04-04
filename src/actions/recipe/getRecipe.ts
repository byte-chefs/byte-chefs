'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getRecipe = cache(async (recipeId: number) => {
  try {
    return await prisma.recipe.findUnique({
      where: { id: recipeId },
    })
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw new Error('Failed to fetch recipe')
  }
})
