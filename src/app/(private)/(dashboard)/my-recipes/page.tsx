import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function MyRecepiesPage(props: TProps) {
  const { data, totalPages } = await getUserRecipes(props.searchParams || Promise.resolve({}))

  return (
    <>
      <h2 className="mb-8 font-bold md:mb-12">My recipes</h2>
      <PerPageSelector />
      <RecipeList recipes={data} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
