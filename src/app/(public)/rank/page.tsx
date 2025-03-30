import { getRankedRecipes } from '@/actions/recipes/getRankedRecipes'
import { getAllTags } from '@/actions/tags/getAllTags'
import ClearButton from '@/components/common/ClearButton'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import SearchInput from '@/components/common/Search'
import DifficultySelector from '@/components/common/Selectors/DifficultySelector'
import TagsSelector from '@/components/common/Selectors/TagsSelector'
import RecipeList from '@/components/recipes/RecipeList'
import { TProps } from '@/types/pageProps'

export default async function TopRecepiesPage(props: TProps) {
  const { data, totalPages } = await getRankedRecipes(props.searchParams || Promise.resolve({}))
  const { data: tags } = await getAllTags(Promise.resolve({}))

  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">Top liked recipes</h2>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-5">
          <SearchInput />
          <PerPageSelector />
          <TagsSelector tags={tags} />
          <DifficultySelector />
          <ClearButton />
        </div>
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
