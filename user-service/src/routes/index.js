import express from 'express'
import {
  deleteUser,
  getAllUsers,
  getUser,
  postUser,
  updateUser
} from '../controllers/user.js'

const router = express.Router()

// User routes
router.route('/user').get(getAllUsers)
router.route('/user/:name').get(getUser)
router.route('/user').post(postUser).patch(updateUser).delete(deleteUser)

export { router as rootRouter }
