import User from '../database/models/userModel.js'
import { logger, objectFormatter } from '../utils/logger.js'
import Password from '../utils/password.js'
import { isTokenValid, createToken } from '../utils/token.js'
import { RESPONSE_TYPES } from '../utils/responseTypes.js'

const getUser = async (req, res) => {
  const prefix = 'getUser'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const { id } = req.params

    logger.http({ prefix, message: `Searching user with id: ${id}` })

    const validatedToken = isTokenValid(req.headers.authorization)
    if (validatedToken.err) {
      logger.error({ prefix, message: validatedToken.data })
      return res.status(400).send({ errors: validatedToken.data })
    }
    logger.http({
      prefix,
      message: `Valid token: ${objectFormatter(validatedToken.data)}`
    })

    const findedUser = await User.findOne({ _id: id })

    if (!findedUser) {
      logger.error({ prefix, message: RESPONSE_TYPES.USER_NOT_FOUND })
      return res.status(400).send({ errors: RESPONSE_TYPES.USER_NOT_FOUND })
    }

    logger.http({
      prefix,
      message: `${RESPONSE_TYPES.USER_FOUND} ${findedUser}`
    })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.send(findedUser)
  } catch (err) {
    logger.error(err.message)
  }
}

const getAllUsers = async (req, res) => {
  const prefix = 'getAllUsers'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const allUsers = await User.find({})
    logger.http({ prefix, message: 'Retrieving al users from db' })

    if (!allUsers) {
      logger.error({ prefix, message: RESPONSE_TYPES.THERE_ARE_NO_USERS })
      return res.status(400).send({ errors: RESPONSE_TYPES.THERE_ARE_NO_USERS })
    }

    logger.http({ prefix, message: `retrieved all users: ${allUsers}` })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.send(allUsers)
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

const createUser = async (req, res) => {
  const prefix = 'createUser'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      logger.error({ prefix, message: RESPONSE_TYPES.USER_ALREADY_EXISTS })
      return res
        .status(400)
        .send({ errors: RESPONSE_TYPES.USER_ALREADY_EXISTS })
    }

    const newUser = new User({ ...req.body })
    logger.http({
      prefix,
      message: `Creating user with body: ${objectFormatter(req.body)}`
    })
    await newUser.save()

    logger.http({ prefix, message: `user created successfully: ${newUser}` })
    logger.http({ prefix, message: 'finished request...' })

    res.send(newUser)
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

const updateUser = async (req, res) => {
  const prefix = 'updateUser'
  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const { id } = req.params
    logger.http({ prefix, message: `Searching for user with id: ${id}` })

    const findedUser = await User.findOne({ _id: id })
    if (!findedUser) {
      logger.error(RESPONSE_TYPES.USER_NOT_FOUND)
    }

    logger.http({
      prefix,
      message: `Updating user with id: ${id} and data: ${objectFormatter(
        req.body
      )}`
    })

    findedUser.set({ ...req.body })
    await findedUser.save()

    logger.http({ prefix, message: `user updated successfully` })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.send(findedUser)
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

const deleteUser = async (req, res) => {
  const prefix = 'deleteUser'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })
    logger.http({ prefix, message: `deleting user with id: ${req.params.id}` })

    await User.findByIdAndDelete(req.params.id)

    logger.http({ prefix, message: 'user deleted successfully' })
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_FINISHED })

    res.send('user deleted successfully')
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

const signinUser = async (req, res) => {
  const prefix = 'signinUser'

  try {
    logger.http({ prefix, message: RESPONSE_TYPES.REQUEST_INCOMING })

    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      logger.error({ prefix, message: RESPONSE_TYPES.INVALID_CREDENTIALS })
      return res
        .status(400)
        .send({ errors: RESPONSE_TYPES.INVALID_CREDENTIALS })
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    )

    if (!passwordMatch) {
      logger.error({ prefix, message: RESPONSE_TYPES.INVALID_CREDENTIALS })
      return res
        .status(400)
        .send({ errors: RESPONSE_TYPES.INVALID_CREDENTIALS })
    }
    const token = createToken(existingUser.id, existingUser.email)
    if (!token) {
      logger.error({ prefix, message: RESPONSE_TYPES.TOKEN_NOT_CREATED })
      return res.status(400).send({ errors: RESPONSE_TYPES.TOKEN_NOT_CREATED })
    }

    res.status(201).send({ token: `Bearer ${token}` })
  } catch (err) {
    logger.error({ prefix, message: err.message })
  }
}

export { getUser, getAllUsers, createUser, updateUser, deleteUser, signinUser }
