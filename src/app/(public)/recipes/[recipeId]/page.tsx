import { Recipe } from '@/types'
import { getRecipe } from '@/actions/recipe/getRecipe'
import { notFound } from 'next/navigation'
import RecipeOverview from '@/components/recipe/RecipeOverview'

export default async function RecipePage({ params }: { params: { recipeId: string } }) {
  const id = params.recipeId;

  if (!id) {
    return notFound();
  }

  const recipe: Recipe = await getRecipe(Number(id));

  return (
    <main>
      <RecipeOverview recipe={recipe} />
    </main>
  )
}
