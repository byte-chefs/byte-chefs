import { FC } from 'react'
import { RecipeCardProps } from '@/types'
import Link from 'next/link'

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition duration-300 hover:bg-gray-700"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-100">{recipe?.name}</h2>
        <p className="mt-2 text-sm text-gray-400">{recipe?.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
          <span>{recipe?.cookingTime} min</span>
          <span>{recipe?.calories || 'N/A'} kcal</span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
