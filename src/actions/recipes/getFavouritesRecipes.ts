'use server'

import { cache } from 'react'
import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'
import getPaginatedData from '@/actions/heplers/getPaginatedData'
import { TSearchParams } from '@/types/pageProps'
import { Recipe, Recipes } from '@/types/recipe'

export const getFavouritesRecipes = cache(async (searchParams: Promise<TSearchParams>) => {
  const user = await getAuthUserInfo()

  if (!user) throw new Error('User is not authenticated')

  const { page, perPage } = await searchParams

  try {
    const { data: rawData, totalPages } = await getPaginatedData(
      'userFavorites',
      page,
      perPage,
      {
        userId: user.id,
      },
      { recipe: true }
    )

    const mappedData: Recipes = rawData.map(({ recipe }: { recipe: Recipe }) => recipe)

    return { data: mappedData, totalPages }
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    throw new Error('Failed to fetch user recipes')
  }
})
