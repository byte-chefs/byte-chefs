import { getRecipesByTag } from '@/actions/recipes/getRecipesByTag'
import { getAllTags } from '@/actions/tags/getAllTags'
import ClearButton from '@/components/common/ClearButton'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import SearchInput from '@/components/common/Search'
import TagsList from '@/components/tags/TagsList'
import { TProps } from '@/types/pageProps'
import { Tag } from '@/types/tag'

export const revalidate = 60

export default async function TagsListingPage(props: TProps) {
  const { data, totalPages } = await getAllTags(props.searchParams || Promise.resolve({}))

  const tags = await Promise.all(
    data.map(async (tag: Tag) => {
      const { data: recipes } = await getRecipesByTag(Promise.resolve({ perPage: 6 }), tag.id)

      return {
        tag,
        recipes,
      }
    })
  )

  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">Tags page</h2>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-5">
          <SearchInput label="Search by tag" />
          <PerPageSelector />
          <ClearButton />
        </div>
        <TagsList tags={tags} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
