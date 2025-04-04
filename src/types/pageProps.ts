export type TSortParam = 'asc' | 'desc' | 'newest' | 'oldest'

export type TSearchParams = {
  page?: number
  perPage?: number
  sortBy?: TSortParam
  search?: string
  tags?: string
  foodToInclude?: Array<string>
  foodToExclude?: Array<string>
  difficultyLevel?: string
  timeFrom?: number
  timeTo?: string
}

export type TProps = {
  searchParams?: Promise<TSearchParams>
}

export type TSelectOption = { label: string | number; value: string | number }
