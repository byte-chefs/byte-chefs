import { z } from 'zod'

export const createRecipeSchema = z.object({
  id: z.number().int().positive('Recipe ID is required').optional(),
  name: z.string().min(1, 'Recipe name is required'),
  cookingTime: z.number().int().positive().min(1, 'Cooking time is required'),
  description: z
    .array(z.string().min(1, 'Description step is required'))
    .min(1, 'At least one description step is required'),
  photo: z.any().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    required_error: 'Please select a difficulty level',
  }),
  ingredients: z
    .array(
      z.object({
        foodId: z.number(),
        quantity: z.number(),
        servingId: z.number(),
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fat: z.number(),
        name: z.string(),
      })
    )
    .min(1, 'At least one ingredient is required'),
  tags: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        name: z.string(),
      })
    )
    .optional(),
  status: z.enum(['draft', 'published'], {
    required_error: 'Please select a status',
  }),
})
