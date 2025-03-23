import { getAllRecipes } from '@/actions/recipes/getAllRecipes'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function RecipesListingPage(props: TProps) {
  const { data, totalPages } = await getAllRecipes(props.searchParams || Promise.resolve({}))

  return (
    <main className="w-full flex-1">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">All recipes listing</h2>
        <PerPageSelector />
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
