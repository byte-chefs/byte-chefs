export type Recipe = {
  id: number
  name: string
  description: Array<string>
  createdAt: Date
  updatedAt: Date
  photo: string | null
  cookingTime: number
  favouritesTotal: number
  personServing: number
  difficulty: string | null
  status: string
  userId: number
  calories: number
  protein: number
  fat: number
  carbs: number
}

export type Ingredient = {
  id?: number
  recipeId?: number
  name?: string | null
  calories: number
  protein: number
  fat: number
  carbs: number
  foodId?: number
  quantity?: number
  servingId?: number
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
  className?: string
}

export type RecipeOverviewProps = {
  recipe: Recipe
  ingredients: Ingredient[]
  tags: Tag[]
  user?: string
}

export enum RecipeDifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export enum RecipeStatusEnum {
  draft = 'draft',
  published = 'published',
}

export type Tag = {
  id: number | string
  name: string
  exclude?: number[] | string[]
  include?: number[] | string[]
}
