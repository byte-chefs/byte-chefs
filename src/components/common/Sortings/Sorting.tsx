'use client'

import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

const options = [
  { label: 'A -> Z', value: 'asc' },
  { label: 'Z -> A', value: 'desc' },
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]

const Sorting = () => {
  const { handleFiltering } = useSearchAndFiltering()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('sortBy') || 'newest'

  const currentValue = options.find((opt) => opt.value === currentPage)

  return (
    <div className="md:w-40" key={searchParams.toString()}>
      <label htmlFor="sort" className="text-black-lighter mb-2 block text-sm font-medium">
        Sort by
      </label>
      <ReactSelect
        inputId="sort"
        value={currentValue}
        onChange={handleFiltering('sortBy') as never}
        options={options}
        isSearchable={false}
        className="capitalize"
      />
    </div>
  )
}

export default Sorting
