import { logger } from '../utils/logger.js'

export const fatalErrorHandler = ({ prefix, err }) => {
  if (err) {
    logger.error({
      message: `${prefix}: ${err}`
    })
  }

  logger.error({
    message: `${prefix}: Something went wrong!`
  })
}
