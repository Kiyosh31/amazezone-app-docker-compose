import Card from '../database/models/cardModel.js'
import { logger, objectFormatter } from '../utils/logger.js'
import { RESPONSE_TYPES } from '../utils/responseTypes.js'

const createCard = async (req, res) => {
  const prefix = 'createCard'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const { number } = req.body

    const existingCard = await Card.findOne({ number: number })
    if (existingCard) {
      logger.error({ prefix, message: RESPONSE_TYPES.EXISTING_CARD })
      return res.json({ errors: RESPONSE_TYPES.EXISTING_CARD })
    }

    const newCard = new Card({ ...req.body })
    logger.http({
      prefix,
      message: `Creating card with data: ${objectFormatter(newCard)}`
    })
    await newCard.save()

    logger.http({ prefix, message: 'Card created successfully' })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.json(newCard)
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

export { createCard }
