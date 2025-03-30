'use client'

import useSearchAndFiltering from '@/hooks/useSearchAndFiltering'
import { useSearchParams } from 'next/navigation'
import React, { FC, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Tag } from '@/types/tag'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

type TagsSelectorProps = {
  tags: Tag[]
}

const TagsSelector: FC<TagsSelectorProps> = ({ tags }) => {
  const { handleFiltering } = useSearchAndFiltering()
  const searchParams = useSearchParams()
  const currentTags = searchParams.get('tags')

  const options = useMemo(() => {
    return tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }))
  }, [])

  const currentValues = options.filter((val) =>
    currentTags?.split(';').includes(val.value.toString())
  )

  return (
    <div className="md:w-50">
      <label htmlFor="tags" className="text-black-lighter mb-2 block text-sm font-medium">
        Tags
      </label>
      <ReactSelect
        inputId="tags"
        value={currentValues}
        onChange={handleFiltering('tags') as never}
        options={options}
        isSearchable
        isMulti
        maxMenuHeight={200}
      />
    </div>
  )
}

export default TagsSelector
