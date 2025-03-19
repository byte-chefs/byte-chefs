import { FC } from 'react'
import clsx from 'clsx'

const StepsSection: FC<{ steps: string[] }> = ({ steps }) => {
  return (
    <section className="bg-white px-6 py-20 lg:pt-24 lg:pb-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto text-center">
          <h2>Step by step</h2>
          <p className="mt-5 text-lg">
            Each step brings you closer to trying this delicious <br /> recipe, don’t waste your
            time!
          </p>
        </div>

        <div className="mx-auto mt-8 space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={clsx(
                'border-black-lightest bg-white-darker relative flex items-start rounded-3xl border py-10 shadow-md',
                index !== 0 && 'mt-4 lg:mt-8',
                index % 2 === 0 ? 'pr-6 pl-15 lg:pr-8 lg:pl-23' : 'pr-15 pl-6 lg:pr-23 lg:pl-8'
              )}
            >
              <div
                className={clsx(
                  'absolute top-1/2 -translate-y-1/2',
                  index % 2 === 0 ? 'left-0' : 'right-0'
                )}
              >
                <span
                  className={clsx(
                    'bg-primary-lighterer text-primary-lightest flex h-10 w-12 items-center justify-center py-6 text-lg font-bold shadow-md lg:w-20 lg:text-3xl',
                    index % 2 === 0
                      ? 'rounded-tr-full rounded-br-full'
                      : 'rounded-tl-full rounded-bl-full'
                  )}
                >
                  {index + 1}
                </span>
              </div>
              <p className="text-primary-default ml-10">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsSection
