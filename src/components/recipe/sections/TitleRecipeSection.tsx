import { FC } from 'react'
import Image from 'next/image'
import FavoriteToggle from '@/components/recipe/chunks/FavoriteToggle'
import { checkIsFavourite } from '@/actions/recipes/checkIsFavourite'

type TitleSectionProps = {
  id: number
  name: string
  cookingTime: number
  difficulty: string
  personServing: number
  photo?: string | null
  user?: string
}

const TitleRecipeSection: FC<TitleSectionProps> = async ({
  id,
  name,
  cookingTime,
  difficulty,
  photo,
  personServing,
  user,
}) => {
  const { favorited } = await checkIsFavourite(id)
  return (
    <section className="text-black-default w-full bg-white px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-32 lg:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between lg:flex-row">
        <div className="w-full text-center lg:w-3/7 lg:text-left">
          <h1>{name}</h1>
          <div className="flex flex-wrap justify-center gap-x-5 lg:block">
            {cookingTime && (
              <div className="text-md mt-4 flex items-center gap-x-2 py-4 tracking-widest lg:mt-14 lg:gap-x-6 lg:text-xl">
                <img src="/icons/time.svg" alt="Time Icon" className="h-6 w-6 lg:h-12 lg:w-12" />
                {cookingTime} minutes
              </div>
            )}
            {difficulty && (
              <div className="text-md mt-4 flex items-center gap-x-6 py-4 tracking-widest lg:mt-0 lg:text-xl">
                <img src="/icons/speed.svg" alt="Time Icon" className="h-6 w-6 lg:h-12 lg:w-12" />
                {difficulty} level
              </div>
            )}
            {personServing && (
              <div className="text-md mt-4 flex items-center gap-x-6 py-4 tracking-widest lg:mt-0 lg:text-xl">
                <img src="/icons/people.svg" alt="Time Icon" className="h-6 w-6 lg:h-12 lg:w-12" />
                For {personServing} people
              </div>
            )}

            <FavoriteToggle
              recipeId={id}
              initialIsFavorite={favorited}
              className="hidden lg:inline-flex"
            />
          </div>
        </div>
        <div className="w-content relative lg:w-3/7">
          <Image
            src={photo ?? '/recipy-preview.png'}
            alt="Delicious Pasta"
            width={600}
            height={720}
            className="min-h-fit rounded-2xl object-cover shadow-lg"
          />

          <div className="bg-white-darkest absolute right-3 bottom-3 rounded-2xl px-4 py-3 text-base font-bold tracking-wide text-black shadow-md lg:text-lg">
            by {user}
          </div>
        </div>

        <FavoriteToggle
          recipeId={id}
          initialIsFavorite={favorited}
          className="inline-flex lg:hidden"
        />
      </div>
    </section>
  )
}

export default TitleRecipeSection
