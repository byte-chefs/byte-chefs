'use server'

import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/utils/supabase/server'
import { SupabaseError } from '@/lib/errors/supabase-error'
import { profileSchema } from '@/schemas/profile/profileSchema'
import { prisma } from '@/lib/prisma'

export const updateProfileAction = actionClient
  .schema(profileSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { firstName, lastName, aboutMe, profileImage, allergens, userId } = parsedInput

    const supabase = await createClient()

    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstName: firstName || null,
          lastName: lastName || null,
          aboutMe: aboutMe || null,
          profileImage: profileImage || null,
          allergens: allergens || [],
        },
      })

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        await supabase.auth.updateUser({
          data: {
            firstName,
            lastName,
            profileImage,
          },
        })
      }
    } catch (error) {
      if (error instanceof SupabaseError) {
        throw error
      }
      throw new Error('Failed to update user profile')
    }
  })
