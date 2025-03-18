import { getAllRecipes } from '@/actions/recipes/getAllRecipes'
import RecipeList from '@/components/recipes/RecipeList'
import { Recipes } from '@/types'

export const revalidate = 10

export default async function RecipesListingPage() {
  const data: Recipes = await getAllRecipes()
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-[1292px] px-4 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">All recipes listing</h2>
        <RecipeList recipes={data} />
      </div>
    </main>
  )
}
