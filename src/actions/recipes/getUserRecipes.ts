'use server'

import { cache } from 'react'
import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'
import getPaginatedData from '@/actions/heplers/getPaginatedData'
import { TSearchParams } from '@/types/pageProps'

export const getUserRecipes = cache(async (searchParams: Promise<TSearchParams>) => {
  const user = await getAuthUserInfo()

  if (!user) throw new Error('User is not authenticated')

  const { page, perPage, tags, difficultyLevel, search, sortBy } = await searchParams

  try {
    const tagIds = tags
      ?.split(';')
      .map((id) => parseInt(id))
      .filter(Boolean)

    const where: Record<string, unknown> = {}
    const orderBy: Record<string, 'asc' | 'desc'> = {}

    if (tagIds?.length) {
      where.tags = {
        some: {
          tagId: { in: tagIds },
        },
      }
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

    where.userId = user.id

    if (sortBy === 'asc' || sortBy === 'desc') {
      orderBy.name = sortBy
    } else {
      orderBy.createdAt = !sortBy || sortBy === 'newest' ? 'desc' : 'asc'
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
    console.error('Error fetching user recipes:', error)
    throw new Error('Failed to fetch user recipes')
  }
})
