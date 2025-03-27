'use server'

import { cache } from 'react'
import { TSearchParams } from '@/types/pageProps'
import getPaginatedData from '../heplers/getPaginatedData'

export const getRecipesByTag = cache(
  async (searchParams: Promise<TSearchParams>, tagId: number) => {
    const { page, perPage } = await searchParams

    try {
      const whereCondition = {
        tags: {
          some: {
            tag: {
              id: tagId,
            },
          },
        },
      }

      const { data, totalPages } = await getPaginatedData('recipe', page, perPage, whereCondition)

      return { data, totalPages }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw new Error('Failed to fetch recipes')
    }
  }
)
