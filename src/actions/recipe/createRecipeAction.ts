'use server'

import { prisma } from '@/lib/prisma'
import { getUserInfo } from '@/actions/auth/getUserInfo'

type CreateRecipeDTO = {
  name: string
  cookingTime: number
  description: Array<string>
}

export async function createRecipeAction(formData: CreateRecipeDTO) {
  const { name, cookingTime, description } = formData

  const user = await getUserInfo()

  if (!user) return

  try {
    await prisma.recipe.create({
      data: {
        name,
        cookingTime,
        description: description as never,
        status: 'Published',
        userId: user.id,
      },
    })
  } catch (e) {
    console.log(e)
  }
}
