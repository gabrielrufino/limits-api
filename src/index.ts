import { logger } from './logger'
import { redis } from './redis'
import { server } from './server'

const {
  PORT = 3000,
} = process.env

async function main() {
  await redis
    .connect()
    .then(() => logger.info('Connected to redis'))

  server
    .listen(PORT, () => logger.info(`Server is running at ${PORT}`))
}

main()
