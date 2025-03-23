'use server'

import { prisma } from '@/lib/prisma'
import { getUserInfo } from '@/actions/auth/getUserInfo'

export const checkIsFavourite = async (recipeId: number) => {
  const user = await getUserInfo()

  if (!user) {
    return { favorited: false }
  }

  const favorite = await prisma.userFavorites.findUnique({
    where: {
      userId_recipeId: {
        userId: user.id,
        recipeId,
      },
    },
  })

  return { favorited: Boolean(favorite) }
}
