'use client'

import { DEFAULT_PER_PAGE, PAGE_SIZES } from '@/app/constants/pagination'
import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

const PerPageSelector = () => {
  const { handleFiltering } = useSearchAndFiltering()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(String(searchParams))
  const currentPage = params.get('perPage') || DEFAULT_PER_PAGE

  const options = PAGE_SIZES.map((size) => ({
    value: size,
    label: size,
  }))

  const currentValue = options.find((opt) => opt.value === +currentPage)

  return (
    <div className="mx-auto my-6 w-20">
      <label htmlFor="per-page" className="text-black-lighter mb-2 block text-sm font-medium">
        Items per page
      </label>
      <ReactSelect
        inputId="per-page"
        value={currentValue}
        onChange={handleFiltering('perPage') as never}
        options={options}
        isSearchable={false}
      />
    </div>
  )
}

export default PerPageSelector
