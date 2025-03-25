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
  personServing: number
  difficulty: string | null
  status: string
  userId: number
}

export type Ingredient = {
  id?: number;
  recipeId?: number;
  name?: string | null;
  foodId?: number;
  quantity?: number;
  servingId?: number;
}

export type Recipes = Array<Recipe>

export type RecipeCardProps = {
  recipe: Recipe
}

export type RecipeListProps = {
  recipes: Recipes
}

export type ToggleFavouriteProps = {
  recipeId: number
  initialIsFavorite: boolean
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
  hard = 'hard'
}

export enum RecipeStatusEnum {
  draft = 'draft',
  published = 'published',

}

export type Tag = {
  id: number | string,
  name: string,
  exclude?: number[] | string[],
  include?: number[] | string[],
}