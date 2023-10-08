/* globals process */

import { createApi } from 'unsplash-js'

export const handler = async (event) => {
  const { query, orientation } = event.queryStringParameters
  const unsplash = createApi({ accessKey: process.env.UNSPLASH_KEY })
  const body = await unsplash.photos.getRandom({ query, orientation })

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
