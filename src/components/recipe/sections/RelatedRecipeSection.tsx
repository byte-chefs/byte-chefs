import { FC } from 'react'
import Image from 'next/image'

const RelatedRecipeSection: FC = () => {
  return (
    <section className="bg-white px-6 pb-24 lg:pb-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto text-center">
          <h2>Try next</h2>
        </div>

        <div className="mx-auto mt-8 flex space-y-4 gap-x-2.5 md:gap-x-7 lg:gap-x-14">
          <div>
            <Image
              src="/recipy-preview.png"
              alt="Delicious Pasta"
              width={600}
              height={720}
              className="min-h-fit rounded-2xl object-cover shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="mt-4 flex items-center gap-x-2.5 text-sm md:text-lg lg:text-xl">
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
              className="min-h-fit rounded-2xl object-cover shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="mt-4 flex items-center gap-x-2.5 text-sm md:text-lg lg:text-xl">
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
              className="min-h-fit rounded-2xl object-cover shadow-lg"
            />
            <h3 className="mt-5">Homemade kebab</h3>
            <div className="mt-4 flex items-center gap-x-2.5 text-sm md:text-lg lg:text-xl">
              <img src="/icons/time.svg" alt="Time Icon" className="h-3 w-3 lg:h-6 lg:w-6" />
              20 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedRecipeSection
