import { FC } from 'react'
import { RecipeListProps } from '@/types'
import RecipeCard from './RecipeCard'

const RecipeList: FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="space-y-6">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <span className="text-center text-3xl font-semibold text-gray-100">No data</span>
      )}
    </div>
  )
}

export default RecipeList
