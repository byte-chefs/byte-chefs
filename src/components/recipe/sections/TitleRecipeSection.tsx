import { FC } from 'react'
import Image from 'next/image'
import { RecipeOverviewProps } from '@/types'

const TitleRecipeSection: FC<RecipeOverviewProps> = ({ recipe }) => {

  return (
    <section className="w-full bg-white px-4 lg:pt-32 pt-20 lg:pb-40 pb-24 text-black-default sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col items-center lg:flex-row justify-between">
        <div className="w-full text-center lg:text-left lg:w-3/7">
          <h1>{recipe.name}</h1>
          <div className="flex justify-center gap-x-5 flex-wrap lg:block">
            {recipe.cookingTime && (
              <div className="flex text-md lg:text-xl items-center lg:mt-14 lg:mb-5 mt-4 py-5 tracking-widest lg:gap-x-6 gap-x-2">
                <img src="/time.svg" alt="Time Icon" className="w-6 h-6 lg:w-12 lg:h-12" />
                {recipe.cookingTime} minutes
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex text-md lg:text-xl items-center py-5 mt-4 lg:mt-0 lg:mb-5 tracking-widest gap-x-6">
                <img src="/time.svg" alt="Time Icon" className="w-6 h-6 lg:w-12 lg:h-12" />
                {recipe.difficulty}
              </div>
            )}
          </div>
          <button
            className="border-b-2 hidden lg:block mt-14 border-primary-lighter text-primary-lighter p-2.5 cursor-pointer">
            Add to favorites
          </button>
        </div>
        <div className="relative w-content lg:w-3/7">
          <Image
            src="/recipy-preview.png"
            alt="Delicious Pasta"
            width={600}
            height={720}
            className="object-cover min-h-fit rounded-2xl shadow-lg"
          />

          <div
            className="absolute bottom-3 right-3 tracking-wide bg-white-darkest text-black lg:text-lg text-base font-bold px-4 py-3 rounded-2xl shadow-md">
            by Daria Pronina
          </div>
        </div>

        <button
          className="border-b-2 block lg:hidden mt-3.5 border-primary-lighter text-primary-lighter p-2.5 cursor-pointer">
          Add to favorites
        </button>
      </div>
    </section>
  )
}

export default TitleRecipeSection;
