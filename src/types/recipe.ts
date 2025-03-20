export type Recipe = {
  id: number
  name: string
  description: Array<string>
  createdAt: Date
  updatedAt: Date
  photo: string | null
  cookingTime: number
  calories: number | null
  favouritesTotal: number
  difficulty: string | null
  status: string
  userId: number
}

export type Recipes = Array<Recipe>

export type RecipeCardProps = {
  recipe: Recipe
}

export type RecipeListProps = {
  recipes: Recipes
}
