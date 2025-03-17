import { FC, ReactNode } from 'react'
import { Theme } from '@/types'

type Props = {
  icon: ReactNode
  setTheme: (theme: Theme) => void
  theme: Theme
  selectedTheme?: string
}

const ThemeSwitcherButton: FC<Props> = (props) => {
  const { setTheme, selectedTheme, theme, icon } = props

  const selected = theme === selectedTheme

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className="dark:aria-checked:bg-black-lighter aria-checked:bg-black-lightest h-9 w-9 cursor-pointer rounded-md px-2 transition-colors hover:ring-1 focus-visible:ring-1 focus-visible:outline-none [&_svg]:size-5 [&_svg]:shrink-0"
      onClick={() => setTheme(theme)}
    >
      {icon}
    </button>
  )
}

export default ThemeSwitcherButton
