import { NextResponse } from 'next/server'
import crypto from 'crypto'
import OAuth from 'oauth-1.0a'

const FATSECRET_API_URL = 'https://platform.fatsecret.com/rest/server.api'
const CONSUMER_KEY = process.env.FATSECRET_CONSUMER_KEY!
const CONSUMER_SECRET = process.env.FATSECRET_CONSUMER_SECRET!

const oauth = new OAuth({
  consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64')
  },
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  try {
    // Create the data object with all parameters
    const data = {
      method: 'foods.search',
      search_expression: query,
      format: 'json'
    }

    // Create the request data for OAuth signing
    const request_data = {
      url: FATSECRET_API_URL,
      method: 'GET',
      data: data
    }

    // Generate OAuth parameters
    const oauthParams = oauth.authorize(request_data)

    // Construct the URL with all parameters (only once)
    const url = new URL(FATSECRET_API_URL)

    // Combine all parameters (data + oauth)
    const allParams = { ...data, ...oauthParams }

    // Add all parameters to the URL
    Object.entries(allParams).forEach(([key, value]) => {
      url.searchParams.append(key, value as string)
    })

    // Make the request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', errorText)
      throw new Error(`Failed to search foods: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data.foods?.food || [])
    } else {
      const text = await response.text()
      console.log('XML Response:', text)

      return NextResponse.json({
        error: 'Received XML instead of JSON',
        message: 'The API returned XML despite requesting JSON format'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error searching foods:', error)
    return NextResponse.json({ error: 'Failed to search foods' }, { status: 500 })
  }
}