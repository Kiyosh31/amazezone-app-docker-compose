import User from '../models/user.js'

const getUser = async (req, res) => {
  try {
    const findedUser = await User.findOne({ username: req.params.name })
    res.send(findedUser)
  } catch (err) {
    throw new Error('User not found')
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (err) {
    throw new Error('Users not found')
  }
}

const postUser = async (req, res) => {
  try {
    const newUser = new User({ ...req.body })
    await newUser.save()
    res.send(newUser)
  } catch (err) {
    throw new Error('User could not be created')
  }
}

const updateUser = (req, res) => {
  try {
  } catch (err) {
    throw new Error('User could not be updated')
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ username: req.body.username })
    res.send('User deleted successfully')
  } catch (err) {
    throw new Error('User could not be deleted')
  }
}

export { getUser, getAllUsers, postUser, updateUser, deleteUser }
