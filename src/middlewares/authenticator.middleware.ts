import express from 'express'

import { UnauthorizedError } from '../errors/unauthorized.error'

const {
  AUTH_TOKENS = ''
} = process.env

export function AuthenticatorMiddleware(): express.RequestHandler {
  const tokens = AUTH_TOKENS.split(',')

  return function (request: express.Request, response: express.Response, next: express.NextFunction) {
    const { authorization } = request.headers

    if (!authorization || !tokens.includes(authorization)) {
      return response.status(401).json(new UnauthorizedError())
    }

    next()
  }
}
