import express from 'express'

import { PublicController } from './controllers/public.controller'

const {
  PORT = 3000
} = process.env

const app = express()

app.get('/public', PublicController.get)

app.listen(PORT)
