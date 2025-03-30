import { FC } from 'react'
import { RecipeListProps } from '@/types'
import RecipeCard from './RecipeCard'
import NoDataPreview from './chunks/NoDataPreview'

const RecipeList: FC<RecipeListProps> = ({ recipes, direction = 'vertical' }) => {
  return recipes.length > 0 ? (
    <div className="grid grid-cols-2 gap-5.5 md:grid-cols-3 md:gap-11">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} direction={direction} />
      ))}
    </div>
  ) : (
    <NoDataPreview />
  )
}

export default RecipeList
