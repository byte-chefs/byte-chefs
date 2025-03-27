'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getTags = cache(async () => {
  try {
    return await prisma.tag.findMany()
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    throw new Error('Failed to fetch ingredients')
  }
})
