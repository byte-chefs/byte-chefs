import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import ROUTES from '@/app/constants/routes'

export async function checkAuth() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect(ROUTES.LOGIN)
  }

  return data.user
}
