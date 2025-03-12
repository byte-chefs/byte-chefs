'use server'

import { checkAuth } from '@/utils/supabase/checkAuth'
import { prisma } from 'lib/prisma'

export async function getOrCreateUser() {
  const user = await checkAuth()

  if (!user || !user.email) {
    return null
  }

  const { email } = user

  let prismaData = await prisma.user.findUnique({
    where: { email },
  })

  if (!prismaData) {
    prismaData = await prisma.user.create({
      data: {
        email,
        role: 'User',
      },
    })
  }

  return prismaData
}
