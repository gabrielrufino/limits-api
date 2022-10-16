import express from 'express'
import http from 'http'
import pino from 'pino-http'

import { PublicController } from './controllers/public.controller'
import { PrivateController } from './controllers/private.controller'
import { ThrottlerMiddleware } from './middlewares/throttler.middleware'
import { LOGGER_OPTIONS } from './logger'


const app = express()

app.use(pino(LOGGER_OPTIONS))

app.get(
  '/public',
  ThrottlerMiddleware({ path: ['ip'] }),
  PublicController.get
)
app.get(
  '/private',
  ThrottlerMiddleware({ path: ['headers', 'Authorization'] }),
  PrivateController.get
)

export const server = http.createServer(app)
