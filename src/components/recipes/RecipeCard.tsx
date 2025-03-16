import { FC } from 'react'
import { RecipeCardProps } from '@/types'

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition duration-300 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold dark:text-gray-100">{recipe?.name}</h2>
        <p className="mt-2 text-sm dark:text-gray-400">{recipe?.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm dark:text-gray-300">
          <span>{recipe?.cookingTime} min</span>
          <span>{recipe?.calories || 'N/A'} kcal</span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
