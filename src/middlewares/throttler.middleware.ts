import dayjs from 'dayjs'
import express from 'express'

import { TooManyRequestsError } from '../errors/too-many-requests.error'
import { redis } from '../redis'

export function ThrottlerMiddleware(params: {
  identifier: string[];
  limitPerHour: number;
}): express.RequestHandler {
  const HOUR_IN_SECONDS = 60 * 60

  return async function(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = params.identifier.reduce(
      (accumulator, current) => (accumulator as any)[current],
      request
    ) as unknown as string

    const [counter, ttl]  = await Promise.all([
      redis.get(id),
      redis.ttl(id)
    ])

    if (!counter) {
      await redis.set(id, 1, {
        EX: HOUR_IN_SECONDS
      })
    } else if (Number(counter) >= params.limitPerHour) {
      return response.status(429).json(new TooManyRequestsError({
        unlockAt: dayjs().add(ttl, 'seconds').toDate()
      }))
    }

    await redis.incr(id)
    next()
  }
}
