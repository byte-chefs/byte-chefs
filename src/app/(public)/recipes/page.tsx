import { getAllRecipes } from '@/actions/recipes/getAllRecipes'
import { Recipes } from '@/types'

export const revalidate = 3600

export default async function RecipesListingPage() {
  const data: Recipes = await getAllRecipes()
  return (
    <main>
      <div className="min-h-screen w-full bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-3xl font-semibold text-gray-100">
            All recipes listing
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data?.length > 0 ? (
              data.map((recipe) => (
                <div
                  key={recipe?.id}
                  className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition duration-300 hover:bg-gray-700"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-100">{recipe?.name}</h2>
                    <p className="text-s mt-2 text-gray-400">{recipe?.description}</p>
                    <div className="text-s mt-4 flex items-center justify-between text-gray-300">
                      <span>{recipe?.cookingTime} min</span>
                      <span>{recipe?.calories || 'N/A'} kcal</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-400">No recipes available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
