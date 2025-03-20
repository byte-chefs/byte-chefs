export type TSortParam = 'asc' | 'desc'

export type TSearchParams = {
  page?: number
  perPage?: number
  sortBytitle?: TSortParam
  sortByupdatedat?: TSortParam
  sortBycreatedat?: TSortParam
  search?: string
  tag?: string
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
