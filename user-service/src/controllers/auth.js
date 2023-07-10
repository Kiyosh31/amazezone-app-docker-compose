import User from '../models/user.js'
import { logger } from '../utils/logger.js'
import Password from '../utils/password.js'
import StandardResponse from '../utils/response.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../middlewares/errorHandler.js'
import { fatalErrorHandler } from '../middlewares/fatalErrorHandler.js'

const secret = process.env.SECRET

const getToken = async (req, res) => {
  logger.http({
    message: 'auth request incoming...'
  })

  try {
    const response = new StandardResponse()

    logger.http({
      message: 'auth searching user'
    })

    const findedUser = await User.findOne({ email: req.body.email })

    if (!findedUser) {
      errorHandler({ err: 'user not found', req, res })
    }

    const passwordMatch = await Password.compare(
      findedUser.password,
      req.body.password
    )

    if (passwordMatch) {
      console.log('🚀 ~ entro')
      logger.http({
        message: 'credentials match, creating token'
      })

      const token = jwt.sign(
        {
          sub: findedUser.email,
          name: findedUser.name,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      )

      const fullToken = `Bearer ${token}`

      logger.http({
        message: `Token created successfully with value: ${fullToken}`
      })

      response.created(fullToken)
      res.send(response)
    }

    errorHandler({ err: 'credentials are not valid', req, res })
  } catch (err) {
    fatalErrorHandler({ prefix: 'auth', err: err.message })
  }
}

export { getToken }
