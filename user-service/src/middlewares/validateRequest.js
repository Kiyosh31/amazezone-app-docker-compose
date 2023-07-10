import { validationResult } from 'express-validator'
import { logger, objectFormatter } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'

export const validateRequest = (req, res, next) => {
  const response = new StandardResponse()
  const errors = validationResult(req)
  const msg = 'Some props are wrong'

  if (!errors.isEmpty()) {
    logger.error({
      message: msg,
      status: 400,
      data: objectFormatter(errors.array())
    })

    response.error({ message: msg, data: errors.array() })

    res.status(response.code).send(response)
  } else {
    next()
  }
}
