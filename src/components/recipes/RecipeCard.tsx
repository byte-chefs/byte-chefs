import { FC } from 'react'
import { RecipeCardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="w-full">
      <div className="relative aspect-[10/13] w-full overflow-hidden rounded-xl shadow-2xl md:rounded-3xl">
        <Image
          src={recipe?.photo || '/recipe-placeholder.png'}
          alt={recipe?.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-2 flex flex-col md:mt-6">
        <Link href={`/recipe/${recipe?.id}`} className="inline-block">
          <h3 className="leading-none md:font-bold">{recipe?.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-1 md:mt-4 md:gap-3">
          <Clock className="h-3 w-3 md:h-6 md:w-6" />
          <p className="leading-none">{recipe?.cookingTime} min</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
