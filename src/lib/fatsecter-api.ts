import { cache } from 'react'

let accessToken: string | null = null
let tokenExpiry = 0

export async function getAccessToken() {
  if (accessToken && tokenExpiry > Date.now()) {
    return accessToken
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fatsecret/token`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to get access token')
    }

    const data = await response.json()

    accessToken = data.access_token
    tokenExpiry = Date.now() + data.expires_in * 1000

    return accessToken
  } catch (error) {
    console.error('Error getting access token:', error)
    throw error
  }
}

export const searchFoods = cache(async (query: string) => {
  try {
    const response = await fetch(`/api/fatsecret/foods/search?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error('Failed to search foods')
    }

    const data = await response.json()

    return data || []
  } catch (error) {
    console.error('Search foods error:', error)
    return []
  }
})

export const getFoodDetails = cache(async (foodId: number) => {
  try {
    const response = await fetch(`/api/fatsecret/foods/${foodId}`)

    if (!response.ok) {
      throw new Error('Failed to get food details')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Get food details error:', error)
    return null
  }
})
