'use server'

import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/utils/supabase/server'
import { loginSchema } from '@/schemas/auth/loginSchema'
import { SupabaseError } from '@/lib/errors/supabase-error'

export const loginAction = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const supabase = await createClient()

    try {
      const { error } = await supabase.auth.signInWithPassword(parsedInput)

      if (error) throw new SupabaseError(error.message)
    } catch (error) {
      if (error instanceof SupabaseError) {
        throw error
      }
      throw new Error('Failed to login')
    }
  })
