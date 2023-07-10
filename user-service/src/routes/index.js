import express from 'express'
import {
  deleteUser,
  getAllUsers,
  getUser,
  createUser,
  updateUser
} from '../controllers/user.js'
import { getToken } from '../controllers/auth.js'
import {
  createUserMiddleware,
  deleteUserMiddleware,
  updateUserMiddleware
} from '../middlewares/user.js'

const router = express.Router()

// User routes
router.get('/users', getAllUsers)
router.get('/users/:id', getUser)
router.post('/users', createUserMiddleware, createUser)
router.put('/users/:id', updateUserMiddleware, updateUser)
router.delete('/users/:id', deleteUserMiddleware, deleteUser)

// Auth routes
router.route('/auth').post(getToken)

export { router as rootRouter }
