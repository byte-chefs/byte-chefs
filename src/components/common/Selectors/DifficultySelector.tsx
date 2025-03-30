'use client'

import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'
import { RecipeDifficultyEnum } from '@/types/recipe'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

const options = [
  { label: 'All', value: '' },
  { label: RecipeDifficultyEnum.easy, value: RecipeDifficultyEnum.easy },
  { label: RecipeDifficultyEnum.medium, value: RecipeDifficultyEnum.medium },
  { label: RecipeDifficultyEnum.hard, value: RecipeDifficultyEnum.hard },
]

const DifficultySelector = () => {
  const { handleFiltering } = useSearchAndFiltering()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('difficultyLevel')

  const currentValue = options.find((opt) => opt.value === currentPage)

  return (
    <div>
      <label
        htmlFor="difficulty-level"
        className="text-black-lighter mb-2 block text-sm font-medium"
      >
        Difficulty level
      </label>
      <ReactSelect
        inputId="difficulty-level"
        value={currentValue}
        onChange={handleFiltering('difficultyLevel') as never}
        options={options}
        isSearchable={false}
        className="capitalize"
      />
    </div>
  )
}

export default DifficultySelector
