import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import RecipeList from '@/components/recipes/RecipeList'
import { Recipes } from '@/types'

export const revalidate = 10

export default async function MyRecepiesPage() {
  const data: Recipes = await getUserRecipes()
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-[1292px] px-4 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">My recipes listing</h2>
        <RecipeList recipes={data} />
      </div>
    </main>
  )
}
