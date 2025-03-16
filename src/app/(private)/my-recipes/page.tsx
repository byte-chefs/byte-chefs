import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import Pagination from '@/components/common/Pagination'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function MyRecepiesPage(props: TProps) {
  const { data, totalPages } = await getUserRecipes(props.searchParams || {})

  return (
    <main>
      <div className="min-h-screen w-full px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-3xl font-semibold dark:text-gray-100">
            My recipes listing
          </h1>
          <RecipeList recipes={data} />
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
