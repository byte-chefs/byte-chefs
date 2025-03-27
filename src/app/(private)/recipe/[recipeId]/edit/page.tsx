import { notFound } from 'next/navigation'
import { getRecipe } from '@/actions/recipe/getRecipe'
import { getIngredients } from '@/actions/ingredient/getIngredients'
import CreateRecipeForm from '@/components/modules/CreateRecipeForm'
import { Ingredient } from '@/types'
import { getRecipeTags } from '@/actions/tags/getRecipeTags'

export default async function RecipeEditPage({
  params,
}: {
  params: Promise<{ recipeId: string }>
}) {
  const { recipeId } = await params

  if (!recipeId) {
    return notFound()
  }

  const recipe = await getRecipe(Number(recipeId))

  if (!recipe) {
    return notFound()
  }

  const ingredients: Ingredient[] = await getIngredients(Number(recipeId))
  const tags = await getRecipeTags(Number(recipeId))

  return (
    <main>
      <h3 className="mt-5 text-center">Edit your recipe</h3>
      <CreateRecipeForm recipe={recipe} ingredients={ingredients} tags={tags} editMode={true} />
    </main>
  )
}
