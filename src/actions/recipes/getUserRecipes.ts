'use server'

import { cache } from 'react'
import { prisma } from 'lib/prisma'
import { checkAuth } from '@/utils/supabase/checkAuth'

export const getUserRecipes = cache(async () => {
  const user = await checkAuth()
  // TODO: need real user id
  const FAKE_ID = 1

  if (!user) {
    throw new Error('User is not authenticated')
  }

  try {
    return await prisma.recipe.findMany({
      where: { userId: FAKE_ID },
    })
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    throw new Error('Failed to fetch user recipes')
  }
})
