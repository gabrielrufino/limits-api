import express from 'express'
import http from 'http'
import pino from 'pino-http'

import { LOGGER_OPTIONS } from './logger'
import { AuthenticatorMiddleware } from './middlewares/authenticator.middleware'
import { PublicController } from './controllers/public.controller'
import { PrivateController } from './controllers/private.controller'
import { ThrottlerMiddleware } from './middlewares/throttler.middleware'

const {
  PUBLIC_REQUESTS_LIMIT_PER_HOUR = 100,
  PRIVATE_REQUESTS_LIMIT_PER_HOUR = 200
} = process.env

const app = express()

app.use(pino(LOGGER_OPTIONS))

app.get(
  '/public',
  ThrottlerMiddleware({
    identifier: ['ip'],
    limitPerHour: Number(PUBLIC_REQUESTS_LIMIT_PER_HOUR)
  }),
  PublicController.get
)
app.get(
  '/private',
  AuthenticatorMiddleware(),
  ThrottlerMiddleware({
    identifier: ['headers', 'authorization'],
    limitPerHour: Number(PRIVATE_REQUESTS_LIMIT_PER_HOUR)
  }),
  PrivateController.get
)

export const server = http.createServer(app)
