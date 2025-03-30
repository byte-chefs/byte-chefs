'use server'

import { cache } from 'react'
import { TSearchParams } from '@/types/pageProps'
import getPaginatedData from '../heplers/getPaginatedData'

export const getAllTags = cache(async (searchParams: Promise<TSearchParams>) => {
  const { page, perPage, search } = await searchParams

  try {
    const where: Record<string, unknown> = {}

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      }
    }

    const { data, totalPages } = await getPaginatedData('tag', page, perPage, where)

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Failed to fetch tags')
  }
})
