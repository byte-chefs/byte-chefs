'use client'

import { Input } from '@/components/ui/Input'
import useDebounce from '@/hooks/useDebounce'
import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import * as React from 'react'
import { ChangeEvent, useEffect } from 'react'

type SearchInputType = {
  label?: string
  placeholder?: string
}

const SearchInput: React.FC<SearchInputType> = ({
  label = 'Search by the recipe title',
  placeholder = 'Enter search value...',
}) => {
  const [searchValue, setSearchValue] = React.useState('')
  const debouncedValue = useDebounce(searchValue, 300)
  const { handleSearch } = useSearchAndFiltering()

  useEffect(() => {
    handleSearch('search')({ target: { value: debouncedValue } } as ChangeEvent<HTMLInputElement>)
  }, [debouncedValue])

  return (
    <div>
      <label htmlFor="search" className="text-black-lighter mb-2 block text-sm font-medium">
        {label}
      </label>
      <Input
        name="search"
        className="md:w-50"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      />
    </div>
  )
}

export default SearchInput
