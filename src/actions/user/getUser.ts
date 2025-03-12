'use server'

import { getOrCreateUser } from '@/actions/user/getOrCreateUser'

export async function getUser() {
  const user = await getOrCreateUser()

  if (!user) {
    return null
  }

  return user
}
