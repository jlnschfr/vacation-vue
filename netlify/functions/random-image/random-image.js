/* globals process */

import { createApi } from 'unsplash-js'

export const handler = async () => {
  const unsplash = createApi({ accessKey: process.env.UNSPLASH_KEY })
  const response = await unsplash.photos.getRandom({ query: 'test', orientation: 'portrait' })

  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  }
}
