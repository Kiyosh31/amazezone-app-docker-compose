import User from '../models/user.js'
import { logger, objectFormatter } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'
import { validationResult } from 'express-validator'

const getUser = async (req, res) => {
  logger.http({
    message: 'getUser request incoming...'
  })

  try {
    const { id } = req.params
    logger.http({
      message: `getUser Searching user with id: ${id}`
    })
    const response = new StandardResponse()
    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      logger.error({
        message: 'User not found!'
      })
      response.notFound('User')
    } else {
      response.success({ data: findedUser })

      logger.http({
        message: 'getUser: user found',
        status: 200,
        data: findedUser
      })
    }

    logger.http({
      message: 'getUser: finished request...'
    })
    res.send(response)
  } catch (err) {
    logger.error({
      message: `getUser: ${err.message}`
    })
  }
}

const getAllUsers = async (req, res) => {
  logger.http({
    message: 'getAllUsers: incoming request...'
  })

  try {
    const response = new StandardResponse()
    const allUsers = await User.find({})

    logger.http({
      message: 'getAllUsers: Retrieving al users from db'
    })

    if (!allUsers) {
      logger.error({
        message: 'Users not found'
      })
      response.notFound('Users')
    } else {
      logger.http({
        message: `getAllUsers: all users`,
        status: 200,
        data: allUsers
      })

      response.success({ data: allUsers })
    }

    logger.http({
      message: 'getAllUsers: finished request...'
    })

    res.send(response)
  } catch (err) {
    logger.error({
      message: `getAllUsers: ${err.message}`
    })
  }
}

const createUser = async (req, res) => {
  logger.http({
    message: 'createUser: incoming request...'
  })

  const response = new StandardResponse()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    logger.error({
      message: `createUser: errors: ${errors.array()}`
    })

    response.error(`createUser: errors`, errors.array())

    res.send(response)
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser) {
      logger.error({
        message: 'The user already exists',
        data: existingUser
      })

      response.error('createUser: user already exists')
    } else {
      const newUser = new User({ ...req.body })

      logger.http({
        message: `createUser: Creating user with body: ${objectFormatter(
          req.body
        )}`
      })

      await newUser.save()

      logger.http({
        message: 'createUser: user created successfully',
        status: 200,
        data: newUser
      })

      response.created(newUser)

      logger.http({
        message: 'createUser: finished request...'
      })
    }

    res.send(response)
  } catch (err) {
    logger.error({
      message: `createUser: ${err.message}`
    })
  }
}

const updateUser = async (req, res) => {
  logger.http({
    message: 'updateUser: incoming request...'
  })

  const response = new StandardResponse()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    logger.error({
      message: `updateUser: errors: ${errors.array()}`
    })

    response.error(`updateUser: errors`, errors.array())

    res.send(response)
  }

  try {
    const { id } = req.params
    console.log('🚀 ~ file: user.js:166 ~ updateUser ~ body:', req.body)

    logger.http({
      message: `Searching for user with id: ${id}`
    })
    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      logger.error({
        message: 'User does not exists'
      })

      response.error('User does not exists')
    } else {
      logger.http({
        message: `Updating user with id: ${id} and data: ${objectFormatter(
          req.body
        )}`
      })

      findedUser.set({ ...req.body })
      await findedUser.save()

      logger.http({
        message: `user updated successfully`
      })

      response.success({ data: findedUser })
    }

    logger.http({
      message: 'updateUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    logger.error({
      message: `updateUser: errors: ${err.message}`
    })
  }
}

const deleteUser = async (req, res) => {
  logger.http({
    message: 'deleteUser: incoming request...'
  })
  const response = new StandardResponse()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    logger.error({
      message: `deleteUser: errors: ${errors.array()}`
    })

    response.error('deleteUser: errors', errors.array())

    res.send(response)
  }

  try {
    logger.http({
      message: `deleteUser: deleting user with id: ${req.params.id}`
    })

    await User.findByIdAndDelete(req.params.id)
    response.deleted()

    logger.http({
      message: 'deleteUser: user deleted successfully',
      status: 200,
      data: null
    })

    logger.http({
      message: 'deleteUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    logger.error({
      message: `deleteUser: ${err.message}`
    })
  }
}

export { getUser, getAllUsers, createUser, updateUser, deleteUser }
