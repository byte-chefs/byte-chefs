import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/app/constants/pagination'
import { PrismaClient } from '@prisma/client'
import { prisma } from '@/lib/prisma'

type ModelNames = Exclude<Extract<keyof PrismaClient, string>, `$${string}`>

export default async function getPaginatedData(
  model: ModelNames,
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PER_PAGE,
  where?: Record<string, unknown>,
  select?: Record<string, unknown>,
  orderBy?: Record<string, unknown>
) {
  const skip = (page - 1) * perPage
  const take = perPage

  const modelType: PrismaClient[typeof model] = prisma[model]

  try {
    //@ts-expect-error models might have different findmany settings
    const data = await modelType.findMany({
      skip: +skip,
      take: +take,
      where: where,
      select: select,
      orderBy: orderBy,
    })

    //@ts-expect-error models might have different count settings
    const totalCount = await modelType.count({
      where: where,
    })

    return {
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
    }
  } catch (e) {
    console.log(e)
    throw new Error(`Failed to fetch data for ${model} model`)
  }
}
