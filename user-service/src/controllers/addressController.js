import Address from '../database/models/addressModel.js'
import { logger } from '../utils/logger.js'
import { RESPONSE_TYPES } from '../utils/responseTypes.js'

const createAddress = async (req, res) => {
  const prefix = 'createAddress'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const { address } = req.body

    const existingAddress = await Address.findOne({ address: address })
    if (existingAddress) {
      logger.error({ prefix, message: RESPONSE_TYPES.EXISTING_ADDRESS })
      return res.status(400).json({ errors: RESPONSE_TYPES.EXISTING_ADDRESS })
    }

    const newAddress = new Address({ ...req.body })
    logger.http({
      prefix,
      message: `Creating address with data: ${newAddress}`
    })
    await newAddress.save()

    logger.http({
      prefix,
      message: `Address created successfully: ${newAddress}`
    })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.json(newAddress)
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

export { createAddress }
