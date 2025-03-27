'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getUser = cache(async (userId: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
    })
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw new Error('Failed to fetch recipe')
  }
})
