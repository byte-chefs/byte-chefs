'use client'

import { DEFAULT_PER_PAGE, PAGE_SIZES } from '@/app/constants/pagination'
import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import { useSearchParams } from 'next/navigation'
import React, { FC, useMemo } from 'react'
import dynamic from 'next/dynamic'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

type PerPageSelectorProps = {
  className?: string
}

const PerPageSelector: FC<PerPageSelectorProps> = ({ className = '' }) => {
  const { handleFiltering } = useSearchAndFiltering()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('perPage') || DEFAULT_PER_PAGE

  const options = useMemo(() => {
    return PAGE_SIZES.map((size) => ({
      value: size,
      label: size,
    }))
  }, [])

  const currentValue = options.find((opt) => opt.value === +currentPage)

  return (
    <div className={className} key={searchParams.toString()}>
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
