import type { Recipe } from '@prisma/client'

export type Recipes = Array<Recipe>

export type RecipeCardProps = {
  recipe: Recipe
}

export type RecipeListProps = {
  recipes: Recipes
}

export type RecipeOverviewProps = {
  recipe: Recipe
}
