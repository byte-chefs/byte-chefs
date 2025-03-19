import { FC } from 'react'
import clsx from 'clsx';


const StepsSection: FC<{steps: string[]}> = ({steps}) => {

  return (
    <section className="bg-white px-6 lg:pt-24 py-20 lg:pb-40">
      <div className="max-w-6xl mx-auto">
      <div className="mx-auto text-center">
        <h2>Step by step</h2>
        <p className="text-lg mt-5">
          Each step brings you closer to trying this delicious <br /> recipe, don’t waste your time!
        </p>
      </div>

      <div className="mt-8 mx-auto space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={clsx(
              "flex border border-black-lightest items-start bg-white-darker shadow-md rounded-3xl py-10 relative",
              index !== 0 && 'lg:mt-8 mt-4',
              index %2 === 0 ? 'lg:pr-8 lg:pl-23 pr-6 pl-15' : 'lg:pl-8 lg:pr-23 pl-6 pr-15',
            )}
          >
            <div className={clsx(
              "absolute top-1/2 -translate-y-1/2",
              index %2 === 0 ? 'left-0' : 'right-0'
            )}>
              <span
                className={clsx(
                  "bg-primary-lighterer lg:text-3xl py-6 text-lg text-primary-lightest font-bold lg:w-20 w-12 h-10 flex items-center justify-center shadow-md",
                  index %2 === 0 ? 'rounded-tr-full rounded-br-full' : 'rounded-tl-full rounded-bl-full'
                )}>
                {index + 1}
              </span>
            </div>
            <p className="ml-10 text-primary-default">{step}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default StepsSection;
