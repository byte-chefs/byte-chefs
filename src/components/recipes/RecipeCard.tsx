import { FC } from 'react'
import { RecipeCardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ThumbsUp, Clock } from 'lucide-react'

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="w-full">
      <div className="relative aspect-[10/13] w-full overflow-hidden rounded-xl shadow-2xl transition hover:scale-103 md:rounded-3xl">
        <Image
          src={recipe?.photo || '/recipe-placeholder.png'}
          alt={recipe?.name}
          layout="fill"
          objectFit="cover"
        />
        {!!recipe.favouritesTotal && (
          <div className="bg-white-default dark:bg-black-lighter absolute bottom-4 left-4 flex items-center gap-2 rounded-xl px-2.5 py-1.5 shadow-2xl">
            <p className="text-md">{recipe.favouritesTotal}</p>
            <ThumbsUp className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-col md:mt-6">
        <h3 className="leading-none md:font-bold">{recipe?.name}</h3>
        <div className="mt-2 flex items-center gap-1 md:mt-4 md:gap-3">
          <Clock className="h-3 w-3 md:h-6 md:w-6" />
          <p className="leading-none">{recipe?.cookingTime} min</p>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
