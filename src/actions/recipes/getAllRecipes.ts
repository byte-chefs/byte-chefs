'use server'

import { TSearchParams } from '@/types/pageProps'
import { cache } from 'react'
import getPaginatedData from '../heplers/getPaginatedData'

export const getAllRecipes = cache(async (searchParams: TSearchParams) => {
  try {
    const { page, perPage } = await searchParams
    const { data, totalPages } = await getPaginatedData('recipe', page, perPage)

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
})
