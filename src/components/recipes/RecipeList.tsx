import { FC } from 'react'
import { RecipeListProps } from '@/types'
import RecipeCard from './RecipeCard'

const RecipeList: FC<RecipeListProps> = ({ recipes }) => {
  return recipes.length > 0 ? (
    <div className="grid grid-cols-2 gap-5.5 md:grid-cols-3 md:gap-11">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  ) : (
    <h3 className="bold text-center">No data</h3>
  )
}

export default RecipeList
