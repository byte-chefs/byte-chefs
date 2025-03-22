'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getUserInfo } from '@/actions/auth/getUserInfo'

export const toggleFavourite = async (recipeId: number) => {
  const user = await getUserInfo()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  let isFavorited = false

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    })

    if (!recipe) {
      throw new Error('Recipe not found')
    }

    const favorite = await prisma.userFavorites.findUnique({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId,
        },
      },
    })

    if (favorite) {
      await prisma.userFavorites.delete({
        where: {
          userId_recipeId: {
            userId: user.id,
            recipeId,
          },
        },
      })

      await prisma.recipe.update({
        where: { id: recipeId },
        data: {
          favouritesTotal: { decrement: 1 },
        },
      })

      isFavorited = false
    } else {
      await prisma.userFavorites.create({
        data: { userId: user.id, recipeId },
      })

      await prisma.recipe.update({
        where: { id: recipeId },
        data: {
          favouritesTotal: { increment: 1 },
        },
      })

      isFavorited = true
    }
  } catch (error) {
    console.error('Toggle favorite error:', error)
    throw new Error('Failed to toggle favorite')
  }

  revalidatePath('/favourites')

  return { favorited: isFavorited }
}
