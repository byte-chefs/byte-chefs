import { FC } from 'react'
import { RecipeOverviewProps } from '@/types'
import WhatsInsideSection from '@/components/recipe/sections/WhatsInsideSection'
import StepsSection from '@/components/recipe/sections/StepsSection'
import RelatedRecipeSection from '@/components/recipe/sections/RelatedRecipeSection'
import TitleRecipeSection from '@/components/recipe/sections/TitleRecipeSection'

const RecipeOverview: FC<RecipeOverviewProps> = ({ recipe, ingredients, tags, user }) => {
  const { name, cookingTime, description, difficulty, personServing, photo, id, fat, protein, carbs, calories } = recipe

  return (
    <div className="space-y-6">
      <TitleRecipeSection
        name={name}
        cookingTime={cookingTime}
        difficulty={String(difficulty)}
        photo={photo}
        personServing={personServing}
        user={user}
        id={id}
      />
      <WhatsInsideSection ingredients={ingredients} tags={tags} fat={fat} protein={protein} carbs={carbs} calories={calories} />
      <StepsSection steps={description} />
      <RelatedRecipeSection />
    </div>
  )
}

export default RecipeOverview
