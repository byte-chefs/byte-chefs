import { getUserRecipes } from '@/actions/recipes/getUserRecipes'
import ClearButton from '@/components/common/ClearButton'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import SearchInput from '@/components/common/Search'
import DifficultySelector from '@/components/common/Selectors/DifficultySelector'
import TagsSelector from '@/components/common/Selectors/TagsSelector'
import Sorting from '@/components/common/Sortings/Sorting'
import RecipeList from '@/components/recipes/RecipeList'
import { getAllTags } from '@/lib/tags'
import { TProps } from '@/types/pageProps'

export const revalidate = 60

export default async function MyRecepiesPage(props: TProps) {
  const { data, totalPages } = await getUserRecipes(props.searchParams || Promise.resolve({}))
  const tags = await getAllTags()

  return (
    <>
      <h2 className="mb-8 font-bold md:mb-12">My recipes</h2>
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-5">
        <SearchInput />
        <PerPageSelector />
        <TagsSelector tags={tags} />
        <DifficultySelector />
        <Sorting />
        <ClearButton />
      </div>
      <RecipeList recipes={data} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
