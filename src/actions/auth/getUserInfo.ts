'use server'

import { getUserByEmail } from '@/utils/auth/getUserByEmail'
import { getUser } from '@/utils/supabase/getUser'

export async function getUserInfo() {
  try {
    const user = await getUser()

    if (!user) return null

    return await getUserByEmail(user.email)
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}
