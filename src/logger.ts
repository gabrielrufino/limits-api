import pino, { LoggerOptions } from 'pino'

const {
  NODE_ENV = 'development'
} = process.env

export const LOGGER_OPTIONS: LoggerOptions = {
  ...(NODE_ENV === 'development' ? {
    transport: {
      target: 'pino-pretty'
    }
  } : {})
}

export const logger = pino(LOGGER_OPTIONS)
