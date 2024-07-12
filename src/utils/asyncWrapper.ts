import { RequestHandler } from 'express'

const wrap =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))

export { wrap }
