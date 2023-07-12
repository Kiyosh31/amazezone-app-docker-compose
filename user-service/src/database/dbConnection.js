import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'

export default mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    logger.info({
      message: 'Connected to DB!'
    })
  })
  .catch((err) => {
    logger.error({
      message: `Error connecting to MongoDB: ${err.message}`
    })
  })
