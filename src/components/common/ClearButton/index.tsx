'use client'

import { Button } from '@/components/ui/Button'
import useNavigation from '@/hooks/useNavigation'

const ClearButton = () => {
  const { router, pathname } = useNavigation()

  const handleClearSearchAndFiltering = async () => {
    router.push(pathname)
  }

  return (
    <Button
      className="mb-[2px] self-end"
      type="button"
      variant="destructive"
      onClick={handleClearSearchAndFiltering}
    >
      Clear all
    </Button>
  )
}

export default ClearButton
