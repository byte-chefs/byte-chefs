import { getAllRecipes } from '@/actions/recipes/getAllRecipes'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import SearchInput from '@/components/common/Search'
import { TProps } from '@/types/pageProps'
import TagsSelector from '@/components/common/Selectors/TagsSelector'
import DifficultySelector from '@/components/common/Selectors/DifficultySelector'
import Sorting from '@/components/common/Sortings/Sorting'
import ClearButton from '@/components/common/ClearButton'
import { getAllTags } from '@/lib/tags'

export const revalidate = 60

export default async function RecipesListingPage(props: TProps) {
  const { data, totalPages } = await getAllRecipes(props.searchParams || Promise.resolve({}))
  const tags = await getAllTags()

  return (
    <main className="w-full flex-1">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">All recipes listing</h2>
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
      </div>
    </main>
  )
}
