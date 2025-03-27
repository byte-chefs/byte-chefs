import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.FATSECRET_CLIENT_ID!
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET!

export async function POST() {
  try {
    const response = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials&scope=basic',
    })

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error getting FatSecret token:', error)
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 })
  }
}
