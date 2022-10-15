import express from 'express';

export const PrivateController = new class {
  public get(_request: express.Request, response: express.Response) {
    return response.json({ status: 'ok' })
  }
}
