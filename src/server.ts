import express from 'express'
import http from 'http'
import pino from 'pino-http'

import { LOGGER_OPTIONS } from './logger'
import { AuthenticatorMiddleware } from './middlewares/authenticator.middleware'
import { PublicController } from './controllers/public.controller'
import { PrivateController } from './controllers/private.controller'
import { ThrottlerMiddleware } from './middlewares/throttler.middleware'

const app = express()

app.use(pino(LOGGER_OPTIONS))

app.get(
  '/public',
  ThrottlerMiddleware({ path: ['ip'] }),
  PublicController.get
)
app.get(
  '/private',
  AuthenticatorMiddleware(),
  ThrottlerMiddleware({ path: ['headers', 'authorization'] }),
  PrivateController.get
)

export const server = http.createServer(app)
