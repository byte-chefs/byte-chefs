export type Recipes = Array<{
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  photo: string | null
  cookingTime: number
  calories: number | null
  favouritesTotal: number
  difficulty: string | null
  status: string
  userId: number
}>
