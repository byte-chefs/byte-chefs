'use server'

import { cache } from 'react'
import { getUserInfo } from '../auth/getUserInfo'
import getPaginatedData from '../heplers/getPaginatedData'
import { TSearchParams } from '@/types/pageProps'

export const getUserRecipes = cache(async (searchParams: TSearchParams) => {
  const user = await getUserInfo()

  if (!user) throw new Error('User is not authenticated')

  try {
    const { page, perPage } = await searchParams
    const { data, totalPages } = await getPaginatedData('recipe', page, perPage, {
      userId: user.id,
    })

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    throw new Error('Failed to fetch user recipes')
  }
})
