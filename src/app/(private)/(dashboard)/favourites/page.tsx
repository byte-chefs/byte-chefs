import { getFavouritesRecipes } from '@/actions/recipes/getFavouritesRecipes'
import Pagination from '@/components/common/Pagination'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function FavouritesEditPage(props: TProps) {
  const { data, totalPages } = await getFavouritesRecipes(props.searchParams || Promise.resolve({}))

  return (
    <>
      <h2 className="mb-8 font-bold md:mb-12">Favourite Recipes</h2>
      <RecipeList recipes={data} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
