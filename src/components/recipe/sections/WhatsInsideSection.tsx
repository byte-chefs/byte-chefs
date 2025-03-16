import { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/image'

const tagsArray = ["Italian", "Vegetarian", "Spicy", "Liquid", "Dinner"];
const ingredients = ['2 × 250g higher-welfare pork chops', 'Olive oil', '180g fresh watercress', '1 tablespoon wholegrain mustard', '1 tablespoon runny honey', '3 × 250g higher-welfare pork chops']

const WhatsInsideSection: FC = () => {

  return (
      <section className="bg-black-lightest relative px-6 lg:pb-40 pb-14 lg:pt-24 pt-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2>
            What’s inside?
          </h2>
          <p className="text-lg mt-5">
            We do care about you staying healthy!
          </p>
          <div className="lg:mt-8 flex flex-col justify-between lg:flex-row items-center lg:items-start z-10 relative">
            <div className="mt-5 mb-2 lg:hidden visible text-3xl font-bold flex items-center">
              <p className="text-lg font-regular mr-4">Meal for:</p>
              <button className="px-3 text-primary-lighter py-1">
                -
              </button>
              <span className="px-4 text-primary-lighter py-1">
              2
            </span>
              <button className="px-3 text-primary-lighter py-1">
                +
              </button>
            </div>
            <div
              className="relative bg-white shadow-lg rounded-3xl text-sm md:text-md py-6 px-14 w-full lg:w-4/7 lg:max-w-lg">
              <ul className="text-center lg:text-left text-gray-800">
                {ingredients.map((ingredient, index) => (
                  <li className={clsx(
                    "m-0 py-5 border-black-lightest",
                    index !== ingredients.length - 1 && "border-b"
                  )} key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="mt-14 lg:mt-0 lg:ml-12 w-full lg:w-3/7">
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
                <div className="flex flex-wrap gap-3 mt-2">
                  {tagsArray.map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-5 lg:px-10 text-md lg:text-xl py-1.5 lg:py-2.5 border border-black-lighter rounded-full"
                      >
                    {tag}
                  </span>
                    )
                  )}
                </div>
              </div>

              <div className="mt-14 hidden lg:visible text-3xl font-bold flex items-center">
                <p className="text-lg font-regular mr-4">Meal for:</p>
                <button className="px-3 py-1">
                  -
                </button>
                <span className="px-4 py-1">
              2
            </span>
                <button className="px-3 py-1">
                  +
                </button>
              </div>
            </div>
          </div>
          <Image src="/red-chili-pepper.png" width={520} height={520} className="filter grayscale hidden lg:block absolute z-0 left-0 -bottom-15 " alt="Background image" />
        </div>
      </section>
  )
}

export default WhatsInsideSection;
