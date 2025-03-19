import { FC } from 'react'
import Image from 'next/image'
import { RecipeOverviewProps } from '@/types'

const TitleRecipeSection: FC<RecipeOverviewProps> = ({ recipe }) => {
  return (
    <section className="text-black-default w-full bg-white px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-32 lg:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between lg:flex-row">
        <div className="w-full text-center lg:w-3/7 lg:text-left">
          <h1>{recipe.name}</h1>
          <div className="flex flex-wrap justify-center gap-x-5 lg:block">
            {recipe.cookingTime && (
              <div className="text-md mt-4 flex items-center gap-x-2 py-5 tracking-widest lg:mt-14 lg:mb-5 lg:gap-x-6 lg:text-xl">
                <img src="/icons/time.svg" alt="Time Icon" className="h-6 w-6 lg:h-12 lg:w-12" />
                {recipe.cookingTime} minutes
              </div>
            )}
            {recipe.difficulty && (
              <div className="text-md mt-4 flex items-center gap-x-6 py-5 tracking-widest lg:mt-0 lg:mb-5 lg:text-xl">
                <img src="/icons/time.svg" alt="Time Icon" className="h-6 w-6 lg:h-12 lg:w-12" />
                {recipe.difficulty}
              </div>
            )}
          </div>
          <button className="border-primary-lighter text-primary-lighter mt-14 hidden cursor-pointer border-b-2 p-2.5 lg:block">
            Add to favorites
          </button>
        </div>
        <div className="w-content relative lg:w-3/7">
          <Image
            src="/recipy-preview.png"
            alt="Delicious Pasta"
            width={600}
            height={720}
            className="min-h-fit rounded-2xl object-cover shadow-lg"
          />

          <div className="bg-white-darkest absolute right-3 bottom-3 rounded-2xl px-4 py-3 text-base font-bold tracking-wide text-black shadow-md lg:text-lg">
            by Daria Pronina
          </div>
        </div>

        <button className="border-primary-lighter text-primary-lighter mt-3.5 block cursor-pointer border-b-2 p-2.5 lg:hidden">
          Add to favorites
        </button>
      </div>
    </section>
  )
}

export default TitleRecipeSection
