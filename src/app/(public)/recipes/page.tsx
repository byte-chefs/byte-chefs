import { getAllRecipes } from '@/actions/recipes/getAllRecipes'
import { getAllTags } from '@/actions/tags/getAllTags'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import RecipeList from '@/components/recipes/RecipeList'
import SearchInput from '@/components/common/Search'
import { TProps } from '@/types/pageProps'
import TagsSelector from '@/components/common/Selectors/TagsSelector'
import DifficultySelector from '@/components/common/Selectors/DifficultySelector'

export const revalidate = 60

export default async function RecipesListingPage(props: TProps) {
  const { data, totalPages } = await getAllRecipes(props.searchParams || Promise.resolve({}))
  const { data: tags } = await getAllTags(Promise.resolve({}))

  return (
    <main className="w-full flex-1">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">All recipes listing</h2>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-5">
          <SearchInput />
          <PerPageSelector />
          <TagsSelector tags={tags} />
          <DifficultySelector />
        </div>
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
