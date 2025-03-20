import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function MyRecepiesPage(props: TProps) {
  const { data, totalPages } = await getUserRecipes(props.searchParams || Promise.resolve({}))

  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">My recipes listing</h2>
        <PerPageSelector />
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
