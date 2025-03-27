'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getTagById = cache(async (tagId: number) => {
  try {
    return await prisma.tag.findUnique({
      where: { id: tagId },
    })
  } catch (error) {
    console.error('Error fetching tag data:', error)
    throw new Error('Failed to fetch tag data')
  }
})
