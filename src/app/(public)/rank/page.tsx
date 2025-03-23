import { getRankedRecipes } from '@/actions/recipes/getRankedRecipes'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export default async function TopRecepiesPage(props: TProps) {
  const { data, totalPages } = await getRankedRecipes(props.searchParams || Promise.resolve({}))

  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">Top liked recipes</h2>
        <PerPageSelector />
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
