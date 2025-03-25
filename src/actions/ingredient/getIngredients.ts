'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getIngredients = cache(async (recipeId: number) => {
  try {
    return await prisma.ingredient.findMany({
      where: { recipeId: recipeId },
    })
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    throw new Error('Failed to fetch ingredients')
  }
})
