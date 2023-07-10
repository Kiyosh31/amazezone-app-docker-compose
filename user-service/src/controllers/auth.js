import User from '../models/user.js'
import { logger } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

const getToken = async (req, res) => {
  logger.http({
    message: 'auth request incoming...'
  })

  try {
    logger.http({
      message: 'auth searching user'
    })

    const response = new StandardResponse()
    const findedUser = await User.findOne({ email: req.body.email })

    if (!findedUser) {
      logger.error({
        message: 'user not found!'
      })

      response.notFound('user')
    } else {
      const token = jwt.sign(
        {
          sub: findedUser.email,
          name: findedUser.name,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      )

      response.created(token)
    }

    res.send(response)
  } catch (err) {
    logger.error({
      message: `auth: ${err.message}`
    })
  }
}

export { getToken }
