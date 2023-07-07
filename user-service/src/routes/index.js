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
router.route('/users').get(getAllUsers)
router.route('/users/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/users').post(postUser)

export { router as rootRouter }
