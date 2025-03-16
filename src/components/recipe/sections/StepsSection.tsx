import { FC } from 'react'
import clsx from 'clsx';

const stepsArray = [
  "With a sharp knife, lightly score the fat on the pork chops at 1cm intervals – this will stop them curling up in the pan. Season all over with sea salt.",
  "Place a large frying pan on a medium-high heat and drizzle in ½ tablespoon of oil. Once hot, lay in the pork chops and fry for around 2 minutes on each side, depending on the thickness of your chops, or until golden, crisp and nearly cooked through.",
  "Meanwhile, tip the grains into a large bowl, top with the watercress and cover with non-PVC clingfilm. Microwave on full power for 3 minutes, or until the watercress has darkened and wilted and the grains are piping hot.",
  "When the pork chops have 1 minute to go, add the mustard, honey, and 50ml of water. Move and flip the chops around in the pan, until glossy, deep golden brown and glazed all over, then remove to a board and slice them up.",
  "Divide the grains between plates, top with a sliced pork chop and finish with a dollop of crème fraîche.",
];

const StepsSection: FC = () => {

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
        {stepsArray.map((step, index) => (
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
