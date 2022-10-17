import { createClient } from 'redis'

const {
  REDIS_URL = 'redis://localhost:6379'
} = process.env

export const redis = createClient({
  url: REDIS_URL
})
