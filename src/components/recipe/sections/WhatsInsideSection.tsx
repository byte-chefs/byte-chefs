import { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Ingredient, Tag } from '@/types'

type WhatsInsideSectionProps = {
  ingredients: Ingredient[]
  tags: Tag[]
}

const WhatsInsideSection: FC<WhatsInsideSectionProps> = ({ ingredients, tags }) => {
  return (
    <section className="bg-black-lightest relative px-6 pt-8 pb-14 md:px-16 lg:px-24 lg:pt-24 lg:pb-40">
      <div className="mx-auto max-w-6xl text-center">
        <h2>What’s inside?</h2>
        <p className="mt-5 text-lg">We do care about you staying healthy!</p>
        <div className="relative z-10 flex flex-col items-center justify-between lg:mt-8 lg:flex-row lg:items-start">
          <div className="visible mt-5 mb-2 flex items-center text-3xl font-bold lg:hidden">
            <p className="font-regular mr-4 text-lg">Meal for:</p>
            <button className="text-primary-lighter px-3 py-1">-</button>
            <span className="text-primary-lighter px-4 py-1">2</span>
            <button className="text-primary-lighter px-3 py-1">+</button>
          </div>
          <div className="md:text-md relative w-full rounded-3xl bg-white px-14 py-6 text-sm shadow-lg lg:w-4/7 lg:max-w-lg">
            <ul className="text-center text-gray-800 lg:text-left">
              {ingredients.map((ingredient, index) => (
                <li
                  className={clsx(
                    'border-black-lightest m-0 py-5',
                    index !== ingredients.length - 1 && 'border-b'
                  )}
                  key={ingredient.id}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 w-full lg:mt-0 lg:ml-12 lg:w-3/7">
            <div className="grid grid-cols-4 text-center lg:text-left">
              <div>
                <p className="text-md">Calories</p>
                <h3 className="text-primary-lighter font-bold">831</h3>
              </div>
              <div>
                <p className="text-md">Carbs (g)</p>
                <h3 className="text-primary-lighter font-bold">35.3</h3>
              </div>
              <div>
                <p className="text-md">Fat (g)</p>
                <h3 className="text-primary-lighter font-bold">52.4</h3>
              </div>
              <div>
                <p className="text-md">Protein (g)</p>
                <h3 className="text-primary-lighter font-bold">41.1</h3>
              </div>
            </div>

            <div className="mt-7 lg:mt-14">
              <h3 className="text-left">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-md border-black-lighter rounded-full border px-5 py-1.5 lg:px-10 lg:py-2.5 lg:text-xl"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-14 flex hidden items-center text-3xl font-bold lg:visible">
              <p className="font-regular mr-4 text-lg">Meal for:</p>
              <button className="px-3 py-1">-</button>
              <span className="px-4 py-1">2</span>
              <button className="px-3 py-1">+</button>
            </div>
          </div>
        </div>
        <Image
          src="/red-chili-pepper.png"
          width={520}
          height={520}
          className="absolute -bottom-15 left-0 z-0 hidden grayscale filter lg:block"
          alt="Background image"
        />
      </div>
    </section>
  )
}

export default WhatsInsideSection
