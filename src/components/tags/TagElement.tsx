import { FC } from 'react'
import { TagListElementProps } from '@/types/tag'
import RecipeList from '../recipes/RecipeList'
import Link from 'next/link'
import ROUTES from '@/app/constants/routes'
import { ArrowRight } from 'lucide-react'
import SwiperRecipes from '../common/SwiperRecipes'

const TagElement: FC<TagListElementProps> = ({ tag, recipes }) => {
  return (
    <div className="bg-white-darker space-y-8 rounded-3xl px-7 pt-6 pb-10">
      <Link href={ROUTES.TAG + '/' + tag.id} className="group flex w-max items-center gap-4">
        <h2 className="leading-[0.9]">{tag.name}</h2>
        <ArrowRight className="mt-2 transition group-hover:translate-x-2" />
      </Link>
      {recipes.length > 2 ? (
        <SwiperRecipes recipes={recipes} direction="horizontal" />
      ) : (
        <RecipeList recipes={recipes} direction="horizontal" />
      )}
    </div>
  )
}

export default TagElement
