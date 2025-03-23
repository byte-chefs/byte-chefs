'use server'

import { cache } from 'react'
import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'
import getPaginatedData from '@/actions/heplers/getPaginatedData'
import { TSearchParams } from '@/types/pageProps'

export const getUserRecipes = cache(async (searchParams: Promise<TSearchParams>) => {
  const user = await getAuthUserInfo()

  if (!user) throw new Error('User is not authenticated')

  const { page, perPage } = await searchParams

  try {
    const { data, totalPages } = await getPaginatedData('recipe', page, perPage, {
      userId: user.id,
    })

    return { data, totalPages }
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    throw new Error('Failed to fetch user recipes')
  }
})
