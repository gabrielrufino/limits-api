import dayjs from 'dayjs'
import express from 'express'

import { TooManyRequestsError } from '../errors/too-many-requests.error'
import { redis } from '../redis'

export function ThrottlerMiddleware(params: {
  identifier: string[];
  limitPerHour: number;
  weight?: number;
}): express.RequestHandler {
  const HOUR_IN_SECONDS = 60 * 60
  const {
    identifier,
    limitPerHour,
    weight = 1
  } = params

  return async function(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = identifier.reduce(
      (accumulator, current) => (accumulator as any)[current],
      request
    ) as unknown as string

    await redis.watch(id)

    const [counter, ttl] = await redis
      .multi()
      .get(id)
      .ttl(id)
      .exec()

    if (!counter) {
      await redis.set(id, 1, {
        EX: HOUR_IN_SECONDS,
      })
    } else if (Number(counter) >= limitPerHour) {
      return response.status(429).json(new TooManyRequestsError({
        unlockAt: dayjs().add(ttl as number, 'seconds').toDate()
      }))
    } else {
      await redis.incrBy(id, weight)
    }

    next()
  }
}
