import User from '../models/user.js'
import { logger, objectFormatter } from '../utils/logger.js'
import StandardResponse from '../utils/response.js'
import { validationResult } from 'express-validator'
import { validateToken } from '../utils/token.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { fatalErrorHandler } from '../middlewares/fatalErrorHandler.js'

const getUser = async (req, res) => {
  logger.http({
    message: 'getUser request incoming...'
  })

  if (!validateToken(req)) {
    errorHandler({ err: 'Invalid token', req, res })
  }

  try {
    const { id } = req.params
    const response = new StandardResponse()

    logger.http({
      message: `getUser Searching user with id: ${id}`
    })

    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      errorHandler({ err: 'User not found!', req, res })
    }

    response.success({ data: findedUser })

    logger.http({
      message: 'getUser: user found',
      status: 200,
      data: findedUser
    })

    logger.http({
      message: 'getUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    fatalErrorHandler({ prefix: 'getUser', err: err.message })
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
      errorHandler({ err: 'User not found!', req, res })
    }

    logger.http({
      message: `getAllUsers: all users`,
      status: 200,
      data: allUsers
    })

    response.success({ data: allUsers })

    logger.http({
      message: 'getAllUsers: finished request...'
    })

    res.send(response)
  } catch (err) {
    fatalErrorHandler({ prefix: 'getAllUsers', err: err.message })
  }
}

const createUser = async (req, res) => {
  logger.http({
    message: 'createUser: incoming request...'
  })

  try {
    const response = new StandardResponse()
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser) {
      errorHandler({ err: 'User already exists' })
    }

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

    res.send(response)
  } catch (err) {
    fatalErrorHandler({ prefix: 'createUser', err: err.message })
  }
}

const updateUser = async (req, res) => {
  logger.http({
    message: 'updateUser: incoming request...'
  })

  const response = new StandardResponse()

  try {
    const { id } = req.params

    logger.http({
      message: `Searching for user with id: ${id}`
    })
    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      errorHandler({ err: 'User does not exists', req, res })
    }

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

    logger.http({
      message: 'updateUser: finished request...'
    })

    res.send(response)
  } catch (err) {
    fatalErrorHandler({ prefix: 'updateUser', err: err.message })
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
    fatalErrorHandler({ prefix: 'deleteUser', err: err.message })
  }
}

export { getUser, getAllUsers, createUser, updateUser, deleteUser }
