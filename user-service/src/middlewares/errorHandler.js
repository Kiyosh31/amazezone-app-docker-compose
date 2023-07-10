import { logger, objectFormatter } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'

export const errorHandler = ({ err, req, res }) => {
  const response = new StandardResponse()

  if (err) {
    logger.error({
      message: err,
      status: 400,
      data: `Headers: ${objectFormatter(
        req.params
      )} with body: ${objectFormatter(req.body)}`
    })

    response.error({
      message: err,
      status: 400
    })

    return res.status(response.code).send(response)
  }

  res.status(400).send(response.error({ message: 'Something went wrong' }))
}
