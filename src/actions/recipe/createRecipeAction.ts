'use server'

import { PrismaClient } from '@prisma/client'

import { getUserInfo } from '@/actions/auth/getUserInfo'

type CreateRecipeDTO = {
  name: string
  cookingTime: number
  description: string
}

export async function createRecipeAction(formData: CreateRecipeDTO) {
  const { name, cookingTime, description } = formData
  const prisma = new PrismaClient()

  const user = await getUserInfo()

  if (!user) return

  try {
    await prisma.recipe.create({
      data: {
        name,
        cookingTime,
        description,
        status: 'Published',
        userId: user.id,
      },
    })
  } catch (e) {
    console.log(e)
  }
}
