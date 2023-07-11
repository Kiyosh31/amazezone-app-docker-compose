import User from '../database/models/userModel.js'
import { logger, objectFormatter } from '../utils/logger.js'
import { ErrorHandler } from '../errors/ErrorHandler.js'
import Password from '../utils/password.js'
import jwt from 'jsonwebtoken'
import { secret, isTokenValid } from '../utils/token.js'

const getUser = async (req, res) => {
  try {
    logger.http('getUser request incoming...')

    const { id } = req.params

    logger.http(`getUser Searching user with id: ${id}`)

    const validatedToken = isTokenValid(req.headers.authorization)
    if (validatedToken.err) {
      ErrorHandler(validatedToken.data)
      return res.status(400).send({ errors: validatedToken.data })
    }
    logger.http(`Valid token: ${validatedToken.data}`)

    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      ErrorHandler('User not found!', req, res)
    }

    logger.http(`getUser: user found: ${findedUser}`)
    logger.http('getUser: finished request...')

    res.send(findedUser)
  } catch (err) {
    ErrorHandler(`getUser: ${err.message}`)
  }
}

const getAllUsers = async (req, res) => {
  logger.http('getAllUsers: incoming request...')

  try {
    const allUsers = await User.find({})

    logger.http('getAllUsers: Retrieving al users from db')

    if (!allUsers) {
      ErrorHandler('User not found', req, res)
    }

    logger.http(`getAllUsers: retrieved all users: ${allUsers}`)

    logger.http('getAllUsers: finished request...')

    res.send(allUsers)
  } catch (err) {
    ErrorHandler(`getUser: ${err.message}`)
  }
}

const createUser = async (req, res) => {
  logger.http('createUser: incoming request...')

  try {
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser) {
      ErrorHandler('User already exists', req, res)
    }

    const newUser = new User({ ...req.body })

    logger.http(
      `createUser: Creating user with body: ${objectFormatter(req.body)}`
    )

    await newUser.save()

    logger.http(`createUser: user created successfully: ${newUser}`)

    logger.http('createUser: finished request...')

    res.send(newUser)
  } catch (err) {
    ErrorHandler(`getUser: ${err.message}`)
  }
}

const updateUser = async (req, res) => {
  logger.http('updateUser: incoming request...')

  try {
    const { id } = req.params

    logger.http(`Searching for user with id: ${id}`)
    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      ErrorHandler('User does not exists', req, res)
    }

    logger.http(
      `Updating user with id: ${id} and data: ${objectFormatter(req.body)}`
    )

    findedUser.set({ ...req.body })
    await findedUser.save()

    logger.http(`user updated successfully`)

    logger.http('updateUser: finished request...')

    res.send(findedUser)
  } catch (err) {
    ErrorHandler(`getUser: ${err.message}`)
  }
}

const deleteUser = async (req, res) => {
  logger.http('deleteUser: incoming request...')

  try {
    logger.http(`deleteUser: deleting user with id: ${req.params.id}`)

    await User.findByIdAndDelete(req.params.id)

    logger.http('deleteUser: user deleted successfully')

    logger.http('deleteUser: finished request...')

    res.send('user deleted successfully')
  } catch (err) {
    ErrorHandler(`getUser: ${err.message}`)
  }
}

const signinUser = async (req, res) => {
  logger.http('signinUser: incomind request...')

  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      ErrorHandler('Invalid credentials', req, res)
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    )

    if (!passwordMatch) {
      ErrorHandler('Invalid credentials', req, res)
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      secret
    )

    res.status(201).send({ token: `Bearer ${token}` })
  } catch (err) {
    ErrorHandler(`signinUser: ${err.message}`)
  }
}

export { getUser, getAllUsers, createUser, updateUser, deleteUser, signinUser }
