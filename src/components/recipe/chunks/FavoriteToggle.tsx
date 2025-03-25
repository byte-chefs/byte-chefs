'use client'

import { useState, useTransition } from 'react'
import { toggleFavourite } from '@/actions/recipes/toggleFavourite'
import { ToggleFavouriteProps } from '@/types'
import { Heart, HeartOff } from 'lucide-react'

export default function FavoriteToggle({ recipeId, initialIsFavorite }: ToggleFavouriteProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const { favorited } = await toggleFavourite(recipeId)
      setIsFavorite(favorited)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="border-primary-lighter text-primary-lighter mt-14 hidden inline-flex cursor-pointer gap-1 border-b-2 p-2.5"
    >
      {isFavorite ? (
        <>
          <Heart fill="currentColor" />
          Remove from favorites
        </>
      ) : (
        <>
          <HeartOff />
          Add to favorites
        </>
      )}
    </button>
  )
}
