import User from '../models/user.js'
import { logger, objectFormatter } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'

const getUser = async (req, res) => {
  logger.http({
    message: 'getUser request incoming...'
  })

  try {
    logger.http({
      message: 'getUser Searching user'
    })
    const response = new StandardResponse()
    const findedUser = await User.findOne({ _id: req.params.id })

    if (!findedUser) {
      logger.error({
        message: 'User not found!'
      })
      response.notFound('User')
    } else {
      response.success(findedUser)

      logger.http({
        message: 'getUser',
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
        message: `getAllUsers: info found`,
        status: 200,
        data: allUsers
      })

      response.success(allUsers)
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

const postUser = async (req, res) => {
  logger.http({
    message: 'postUser: incoming request...'
  })

  try {
    const response = new StandardResponse()
    const newUser = new User({ ...req.body })

    logger.http({
      message: `postUser: Creating user with body: ${objectFormatter(req.body)}`
    })

    await newUser.save()

    logger.http({
      message: 'postUser: user created successfully',
      status: 200,
      data: newUser
    })

    response.created()

    logger.http({
      message: 'postUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    logger.error({
      message: `postUser: ${err.message}`
    })
  }
}

const updateUser = async (req, res) => {
  logger.http({
    message: 'updateUser: incoming request...'
  })

  try {
    const response = StandardResponse()
    logger.http({
      message: `updateUser: updating user with id: ${
        req.params.id
      } and body: ${objectFormatter(req.body)}`
    })

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body
      },
      { new: true }
    )

    response.success(updatedUser)

    logger.http({
      message: 'User updated successfully',
      status: 200,
      data: updatedUser
    })

    logger.http({
      message: 'updateUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    logger.error({
      message: `updateUser: ${err.message}`
    })
  }
}

const deleteUser = async (req, res) => {
  logger.http({
    message: 'deleteUser: incoming request...'
  })

  try {
    const response = new StandardResponse()

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

export { getUser, getAllUsers, postUser, updateUser, deleteUser }
