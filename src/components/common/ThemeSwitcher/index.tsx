'use client'

import { useState, useEffect, FC } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import ThemeSwitcherButton from './components/ThemeSwitcherButton'

const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div role="group" className="flex items-center justify-center gap-1">
      <ThemeSwitcherButton icon={<Sun />} setTheme={setTheme} theme="light" selectedTheme={theme} />
      <ThemeSwitcherButton icon={<Moon />} setTheme={setTheme} theme="dark" selectedTheme={theme} />
      <ThemeSwitcherButton
        icon={<Monitor />}
        setTheme={setTheme}
        theme="system"
        selectedTheme={theme}
      />
    </div>
  )
}

export default ThemeSwitcher
