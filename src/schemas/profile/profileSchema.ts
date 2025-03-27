import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  aboutMe: z.string().optional(),
  profileImage: z.string().optional(),
  allergens: z.array(z.string()).optional(),
  userId: z.number().optional(),
})
