import { logger, objectFormatter } from '../utils/logger.js'

export const ErrorHandler = (err = null) => {
  if (err) {
    logger.error(`${err}`)
  }
}
