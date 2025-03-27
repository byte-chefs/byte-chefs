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
  direction?: 'horizontal' | 'vertical'
}

export type RecipeListProps = {
  recipes: Recipes
  direction?: 'horizontal' | 'vertical'
}

export type ToggleFavouriteProps = {
  recipeId: number
  initialIsFavorite: boolean
}

export type RecipeOverviewProps = {
  recipe: Recipe
}
