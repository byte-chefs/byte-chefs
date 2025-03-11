import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function checkAuth() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return data.user
}
