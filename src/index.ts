import express from 'express'

import { PublicController } from './controllers/public.controller'
import { PrivateController } from './controllers/private.controller'

const {
  PORT = 3000
} = process.env

const app = express()

app.get('/public', PublicController.get)
app.get('/private', PrivateController.get)

app.listen(PORT)
