import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import RecipeList from '@/components/recipes/RecipeList'
import { Recipes } from '@/types'

export const revalidate = 10

export default async function MyRecepiesPage() {
  const data: Recipes = await getUserRecipes()
  return (
    <main className="flex-1">
      <div className="w-full bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-3xl font-semibold text-gray-100">
            My recipes listing
          </h1>
          <RecipeList recipes={data} />
        </div>
      </div>
    </main>
  )
}
