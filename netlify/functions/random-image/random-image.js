/* globals process */

export const handler = async () => {
  const value = process.env.UNSPLASH_KEY

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: value
    })
  }
}
