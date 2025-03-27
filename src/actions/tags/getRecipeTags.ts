'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getRecipeTags = cache(async (recipeId: number) => {
  try {
    const recipeTag = await prisma.recipeTag.findMany({
      where: { recipeId: recipeId },
    })

    const tagsIds = recipeTag.map((recipe) => recipe.tagId)

    return await prisma.tag.findMany({
      where: {
        id: {
          in: tagsIds,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    throw new Error('Failed to fetch ingredients')
  }
})
