'use server'

import { PrismaClient } from '@prisma/client'

import { checkAuth } from '@/utils/supabase/checkAuth'

export async function getUserInfo() {
  const prisma = new PrismaClient()

  const user = await checkAuth()

  try {
    const publicUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    return publicUser
  } catch (e) {
    console.log(e)
  }

  return null
}
