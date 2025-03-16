import { FC } from 'react'
import { RecipeOverviewProps } from '@/types'
import WhatsInsideSection from '@/components/recipe/sections/WhatsInsideSection'
import StepsSection from '@/components/recipe/sections/StepsSection'
import RelatedRecipeSection from '@/components/recipe/sections/RelatedRecipeSection'
import TitleRecipeSection from '@/components/recipe/sections/TitleRecipeSection'

const RecipeOverview: FC<RecipeOverviewProps> = ({ recipe }) => {

  return (
    <div className="space-y-6">
      <TitleRecipeSection recipe={recipe} />
      <WhatsInsideSection />
      <StepsSection />
      <RelatedRecipeSection />
    </div>
  )
}

export default RecipeOverview;
