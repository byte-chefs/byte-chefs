'use server'

import { cache } from 'react'
import { TSearchParams } from '@/types/pageProps'
import getPaginatedData from '../heplers/getPaginatedData'

export const getRankedRecipes = cache(async (searchParams: Promise<TSearchParams>) => {
  const { page, perPage } = await searchParams

  try {
    const { data, totalPages } = await getPaginatedData(
      'recipe',
      page,
      perPage,
      {
        favouritesTotal: {
          gt: 0,
        },
      },
      undefined,
      {
        favouritesTotal: 'desc',
      }
    )

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
})
