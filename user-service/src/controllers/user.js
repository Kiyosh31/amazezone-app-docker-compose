import User from '../models/user.js'
import logger from '../utils/logger.js'
import { standardResponse } from '../utils/response.js'

const getUser = async (req, res) => {
  logger.info({
    message: 'getUser request incoming...'
  })

  try {
    logger.info({
      message: 'getUser Searching user...'
    })
    const findedUser = await User.findOne({ _id: req.params.id })

    if (!findedUser) {
      logger.error({
        message: 'User not found!'
      })
    }

    logger.info({
      message: 'getUser',
      status: 200,
      payload: findedUser
    })
    res.send(findedUser)
  } catch (err) {
    throw new Error('Error tyring to fetch user')
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (err) {
    throw new Error('Error tyring to fetch users')
  }
}

const postUser = async (req, res) => {
  try {
    const newUser = new User({ ...req.body })
    await newUser.save()
    res.send(newUser)
  } catch (err) {
    throw new Error('Error tyring to create user')
  }
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body
      },
      { new: true }
    )

    res.send(updatedUser)
  } catch (err) {
    throw new Error('Error tyring to update user')
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.send('User deleted successfully')
  } catch (err) {
    throw new Error('Error tyring to delete user')
  }
}

export { getUser, getAllUsers, postUser, updateUser, deleteUser }
