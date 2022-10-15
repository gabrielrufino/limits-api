import express from 'express'
import pino from 'pino-http'

import { PublicController } from './controllers/public.controller'
import { PrivateController } from './controllers/private.controller'
import { logger } from './logger'

const {
  PORT = 3000
} = process.env

const app = express()

app.use(pino())

app.get('/public', PublicController.get)
app.get('/private', PrivateController.get)

app.listen(PORT, () => logger.info(`Server is running at ${PORT}`))
