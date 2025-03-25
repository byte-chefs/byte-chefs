'use server'

import { getUserByEmail } from '@/utils/auth/getUserByEmail'
import { checkAuth } from '@/utils/supabase/checkAuth'

export async function getAuthUserInfo() {
  const user = await checkAuth()

  try {
    return await getUserByEmail(user.email)
  } catch (error) {
    console.error('Error fetching user info:', error)
  }

  return null
}
