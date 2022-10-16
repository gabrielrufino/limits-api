import express from 'express'

import { TooManyRequestsError } from '../errors/too-many-requests.error'
import { redis } from '../redis'

export function ThrottlerMiddleware(params: {
  path: string[];
}): express.RequestHandler {
  return async function(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = params.path.reduce(
      (accumulator, current) => (accumulator as any)[current],
      request
    ) as unknown as string

    const [counter]  = await Promise.all([
      redis.get(id),
    ])

    if (!counter) {
      await redis.set(id, 1, {
        EX: 60
      })
    } else if (Number(counter) >= 10) {
      return response.status(429).json(new TooManyRequestsError())
    }

    await redis.incr(id)
    next()
  }
}
