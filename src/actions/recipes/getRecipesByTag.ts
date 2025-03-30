'use server'

import { cache } from 'react'
import { TSearchParams } from '@/types/pageProps'
import getPaginatedData from '../heplers/getPaginatedData'

export const getRecipesByTag = cache(
  async (searchParams: Promise<TSearchParams>, tagId: number) => {
    const { page, perPage, difficultyLevel, search, sortBy } = await searchParams

    try {
      const where: Record<string, unknown> = {}
      const orderBy: Record<string, 'asc' | 'desc'> = {}

      where.tags = {
        some: {
          tag: {
            id: tagId,
          },
        },
      }

      if (difficultyLevel) {
        where.difficulty = difficultyLevel
      }

      if (search) {
        where.name = {
          contains: search,
          mode: 'insensitive',
        }
      }

      if (sortBy) {
        if (sortBy === 'asc' || sortBy === 'desc') {
          orderBy.name = sortBy
        } else {
          orderBy.createdAt = sortBy === 'newest' ? 'asc' : 'desc'
        }
      }

      const { data, totalPages } = await getPaginatedData(
        'recipe',
        page,
        perPage,
        where,
        undefined,
        orderBy
      )

      return { data, totalPages }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw new Error('Failed to fetch recipes')
    }
  }
)
