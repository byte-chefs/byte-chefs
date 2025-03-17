'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import type { User } from '@prisma/client'

export async function getUserInfoWithoutRedirect(): Promise<User | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return null
    }

    const user = data.user

    const publicUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    return publicUser
  } catch (error) {
    console.error(error)
  }

  return null
}
