'use server'

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/utils/supabase/server'
import { registerSchema } from '@/schemas/auth/registerSchema'
import { UserRolesEnum } from '@/types/user'
import { SupabaseError } from '@/lib/errors/supabase-error'

export const registerAction = actionClient
  .schema(registerSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      const supabase = await createClient()

      const { email, password } = parsedInput

      const { error } = await supabase.auth.signUp({ email, password })

      if (error) throw new SupabaseError(error.message)

      await prisma.user.create({
        data: { email, role: UserRolesEnum.USER },
      })
    } catch (error) {
      if (error instanceof SupabaseError) {
        throw error
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email already exists, please use a different email')
        }
      }
      throw new Error('Failed to register user')
    }
  })
