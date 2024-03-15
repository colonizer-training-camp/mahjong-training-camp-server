import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'runtypes'

const runtypeErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err)
    return
  }
  if (err instanceof ValidationError) {
    res.sendStatus(400)
    return
  }
  next(err)
}

export default runtypeErrorHandler
