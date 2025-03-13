'use server'

import { prisma } from 'lib/prisma'
import { cache } from 'react'

export const getAllRecipes = cache(async () => {
  try {
    return await prisma.recipe.findMany()
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
})
