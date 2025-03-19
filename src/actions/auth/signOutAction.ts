'use server'

import { redirect } from 'next/navigation'

import ROUTES from '@/app/constants/routes'
import { createClient } from '@/utils/supabase/server'

export async function signOutAction() {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    redirect(ROUTES.HOMEPAGE)
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: 'Failed to sign out' }
  }
}
