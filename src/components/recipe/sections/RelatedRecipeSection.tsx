import { FC } from 'react'
import Image from 'next/image'

const RelatedRecipeSection: FC = () => {

  return (
    <section className="bg-white px-6 lg:pb-36 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto text-center">
          <h2>Try next</h2>
        </div>

        <div className="mt-8 mx-auto flex lg:gap-x-14 md:gap-x-7 gap-x-2.5 space-y-4">
          <div>
            <Image
              src="/recipy-preview.png"
              alt="Delicious Pasta"
              width={600}
              height={720}
              className="object-cover min-h-fit rounded-2xl shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="flex items-center mt-4 text-sm md:text-lg lg:text-xl gap-x-2.5">
              <img src="/icons/time.svg" alt="Time Icon" className="h-3 w-3 lg:h-6 lg:w-6" />
              20 minutes
            </div>
          </div>
          <div>
            <Image
              src="/recipy-preview.png"
              alt="Delicious Pasta"
              width={600}
              height={720}
              className="object-cover min-h-fit rounded-2xl shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="flex items-center mt-4 text-sm md:text-lg lg:text-xl gap-x-2.5">
              <img src="/icons/time.svg" alt="Time Icon" className="h-3 w-3 lg:h-6 lg:w-6" />
              20 minutes
            </div>
          </div>
          <div>
            <Image
              src="/recipy-preview.png"
              alt="Delicious Pasta"
              width={600}
              height={720}
              className="object-cover min-h-fit rounded-2xl shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="flex items-center mt-4 text-sm md:text-lg lg:text-xl gap-x-2.5">
              <img src="/icons/time.svg" alt="Time Icon" className="h-3 w-3 lg:h-6 lg:w-6" />
              20 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedRecipeSection;
