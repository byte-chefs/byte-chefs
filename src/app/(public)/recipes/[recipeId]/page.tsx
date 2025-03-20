import { notFound } from 'next/navigation'
import { getRecipe } from '@/actions/recipe/getRecipe'
import RecipeOverview from '@/components/recipe/RecipeOverview'

export default async function RecipePage({ params }: { params: { recipeId: string } }) {
  const id = params.recipeId

  if (!id) {
    return notFound()
  }

  const recipe = await getRecipe(Number(id))

  if (!recipe) {
    return notFound()
  }

  return (
    <main>
      <RecipeOverview recipe={recipe} />
    </main>
  )
}
