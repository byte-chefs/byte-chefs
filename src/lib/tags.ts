import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTagByName(name: string) {
  try {
    const tag = await prisma.tag.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    })

    return tag
  } catch (error) {
    console.error('Get tag by name error:', error)
    return null
  }
}

export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return tags
  } catch (error) {
    console.error('Get all tags error:', error)
    return []
  }
}

export async function getPopularTags(limit = 10) {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        recipeTag: {
          some: {
            recipe: {
              status: 'published',
            },
          },
        },
      },
      orderBy: {
        recipeTag: {
          _count: 'desc',
        },
      },
      take: limit,
    })

    return tags
  } catch (error) {
    console.error('Get popular tags error:', error)
    return []
  }
}
