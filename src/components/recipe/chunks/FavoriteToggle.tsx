'use client'

import { useState, useTransition } from 'react'
import { toggleFavourite } from '@/actions/recipes/toggleFavourite'
import { ToggleFavouriteProps } from '@/types'
import { Heart, HeartOff } from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'react-toastify'

export default function FavoriteToggle({
  recipeId,
  initialIsFavorite,
  className,
}: ToggleFavouriteProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      try {
        const { favorited } = await toggleFavourite(recipeId)

        if (favorited) {
          toast.success('Added to your favourites!')
        } else {
          toast.success('Removed from your favourites!')
        }

        setIsFavorite(favorited)
      } catch (error) {
        toast.error('Error adding to favourites: try again!')
        console.error(error)
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={clsx(
        'border-primary-lighter text-primary-lighter mt-14 cursor-pointer gap-1 border-b-2 p-2.5',
        className
      )}
    >
      {isFavorite ? (
        <>
          <HeartOff />
          Remove from favorites
        </>
      ) : (
        <>
          <Heart fill="currentColor" />
          Add to favorites
        </>
      )}
    </button>
  )
}
