import { notFound } from 'next/navigation'
import { getRecipesByTag } from '@/actions/recipes/getRecipesByTag'
import RecipeList from '@/components/recipes/RecipeList'
import Pagination from '@/components/common/Pagination'
import PerPageSelector from '@/components/common/Pagination/PerPageSelector'
import { TSearchParams } from '@/types/pageProps'
import { getTagById } from '@/actions/tags/getTagById'

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: Promise<{ tagId: string }>
  searchParams: Promise<TSearchParams>
}) {
  const { tagId } = await params

  if (!tagId) {
    return notFound()
  }

  const { data, totalPages } = await getRecipesByTag(searchParams || Promise.resolve({}), +tagId)
  const tag = await getTagById(+tagId)

  if (!tag) {
    return notFound()
  }

  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1092px] px-4 py-6 md:px-6">
        <h2 className="mb-8 text-center font-bold md:mb-12">{tag.name}</h2>
        <PerPageSelector />
        <RecipeList recipes={data} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
