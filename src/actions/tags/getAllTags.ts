'use server'

import { cache } from 'react'
import { TSearchParams } from '@/types/pageProps'
import getPaginatedData from '../heplers/getPaginatedData'

export const getAllTags = cache(async (searchParams: Promise<TSearchParams>) => {
  const { page, perPage } = await searchParams

  try {
    const { data, totalPages } = await getPaginatedData('tag', page, perPage)

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Failed to fetch tags')
  }
})
