import { notFound } from 'next/navigation'
import { getRecipe } from '@/actions/recipe/getRecipe'
import RecipeOverview from '@/components/recipe/RecipeOverview'
import { getIngredients } from '@/actions/ingredient/getIngredients'
import { Ingredient } from '@/types'
import { getRecipeTags } from '@/actions/tags/getRecipeTags'
import { getUser } from '@/actions/user/getUser'

export default async function RecipePage({ params }: { params: Promise<{ recipeId: string }> }) {
  const { recipeId } = await params;

  if (!recipeId) {
    return notFound()
  }

  const recipe = await getRecipe(Number(recipeId))

  if (!recipe) {
    return notFound()
  }

  const ingredients: Ingredient[] = await getIngredients(Number(recipeId));
  const tags = await getRecipeTags(Number(recipeId));

  const user = await getUser(Number(recipe.userId));

  console.log('USER IS::', user);

  return (
    <main>
      <RecipeOverview recipe={recipe} ingredients={ingredients} tags={tags} user={user?.email} />
    </main>
  )
}
