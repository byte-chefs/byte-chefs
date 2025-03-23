import { createClient } from '@/utils/supabase/server'

export async function getUser() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return null
    }

    return data.user
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}
