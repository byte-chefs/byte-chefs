'use client'

import { DEFAULT_PAGE } from '@/app/constants/pagination'
import useNavigation from '@/hooks/useNavigation'
import React, { useCallback } from 'react'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  totalPages: number
}

type PaginationEvent = {
  selected: number
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const { searchParams, router, pathname } = useNavigation()
  const params = new URLSearchParams(String(searchParams))
  const currentPage = searchParams.get('page') || DEFAULT_PAGE

  const handlePageClick = useCallback(
    (event: PaginationEvent) => {
      const selectedPage = event.selected + 1
      params.set('page', selectedPage.toString())
      router.replace(`${pathname}?${params.toString()}`)
    },
    [pathname, params]
  )

  if (totalPages < 2) {
    return null
  }

  return (
    <div className="my-4">
      <ReactPaginate
        previousLabel={
          <span className="hover:bg-white-darkest cursor-pointer rounded-l-md px-4 py-2">
            {'<'}
          </span>
        }
        nextLabel={
          <span className="hover:bg-white-darkest cursor-pointer rounded-r-md px-4 py-2">
            {'>'}
          </span>
        }
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex items-center justify-end space-x-2"
        activeClassName="bg-black-lightest rounded-md"
        pageClassName="px-4 py-2 border border-none rounded-md cursor-pointer hover:bg-white-darkest"
        breakClassName="px-4 py-2 border border-none cursor-pointer"
        disabledClassName="cursor-not-allowed"
        forcePage={+currentPage - 1}
      />
    </div>
  )
}

export default Pagination
