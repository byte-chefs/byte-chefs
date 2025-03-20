'use server'

import { createClient } from '@/utils/supabase/server'

export async function signOutAction() {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: 'Failed to sign out' }
  }
}
