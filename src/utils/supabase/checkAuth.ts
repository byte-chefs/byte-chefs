import { redirect } from 'next/navigation'

import { getUser } from '@/utils/supabase/getUser'
import ROUTES from '@/app/constants/routes'

export async function checkAuth() {
  const user = await getUser()

  if (!user) {
    redirect(ROUTES.LOGIN)
  }

  return user
}
