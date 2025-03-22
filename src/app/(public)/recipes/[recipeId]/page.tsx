import { notFound } from 'next/navigation'
import { getRecipe } from '@/actions/recipe/getRecipe'
import RecipeOverview from '@/components/recipe/RecipeOverview'

export default async function RecipePage({ params }: { params: Promise<{ recipeId: string }> }) {
  const { recipeId } = await params

  if (!recipeId) {
    return notFound()
  }

  const recipe = await getRecipe(Number(recipeId))

  if (!recipe) {
    return notFound()
  }

  return (
    <main>
      <RecipeOverview recipe={recipe} />
    </main>
  )
}
