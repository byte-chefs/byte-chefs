import { z } from 'zod'

export const createRecipeSchema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  cookingTime: z.number().int().positive().min(1, 'Cooking time is required'),
  description: z
    .array(z.string().min(1, 'Description is required'))
    .min(1, 'At least one description is required'),
})
