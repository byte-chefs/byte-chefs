import { ChangeEvent, useCallback } from 'react'
import { MultiValue, SingleValue } from 'react-select'

import useNavigation from '@/hooks/useNavigation'
import { DEFAULT_PAGE } from '@/app/constants/pagination'
import { TSelectOption } from '@/types/pageProps'

type ReturnData = {
  handleFiltering: (
    key: string
  ) => (option: SingleValue<TSelectOption | null> | MultiValue<TSelectOption | null>) => void
  handleSearch: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void
  handlePageSet: (selectedPage: string) => void
}

const useSearchAndFiltering = (): ReturnData => {
  const { searchParams, router, pathname } = useNavigation()
  const params = new URLSearchParams(String(searchParams))

  const handleSingleValue = (key: string, option: SingleValue<TSelectOption | null>) => {
    if (option && option.value !== undefined) {
      params.set(key, option.value.toString())
      params.set('page', DEFAULT_PAGE.toString())
    } else {
      params.delete(key)
      params.delete('page')
    }
  }

  const handleMultiValue = (key: string, option: MultiValue<TSelectOption | null>) => {
    const values = option
      .filter((opt): opt is TSelectOption => opt !== null && opt.value !== undefined)
      .map((opt) => opt.value)
      .join(';')

    if (values) {
      params.set(key, values)
      params.set('page', DEFAULT_PAGE.toString())
    } else {
      params.delete(key)
      params.delete('page')
    }
  }

  const handleFiltering = useCallback(
    (key: string) =>
      (option: SingleValue<TSelectOption | null> | MultiValue<TSelectOption | null> | null) => {
        if (Array.isArray(option)) {
          handleMultiValue(key, option as MultiValue<TSelectOption | null>)
        } else {
          handleSingleValue(key, option as SingleValue<TSelectOption | null>)
        }

        router.replace(`${pathname}?${params.toString()}`)
      },
    [params, pathname, router]
  )

  const handleSearch = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value

      if (val) {
        params.set(`${key}`, val)
        params.set('page', DEFAULT_PAGE.toString())
      } else {
        params.delete(`${key}`)
        params.delete('page')
      }

      router.replace(`${pathname}?${params.toString()}`)
    },
    [params]
  )

  const handlePageSet = useCallback(
    (selectedPage: string) => {
      params.set('page', selectedPage)
      router.replace(`${pathname}?${params.toString()}`)
    },
    [params]
  )

  return {
    handleFiltering,
    handleSearch,
    handlePageSet,
  }
}

export default useSearchAndFiltering
