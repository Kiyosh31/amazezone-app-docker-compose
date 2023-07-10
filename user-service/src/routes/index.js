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
import { authMiddleware } from '../middlewares/auth.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

// User routes
router.get('/users', getAllUsers)
router.get('/users/:id', getUser)
router.post('/users', createUserMiddleware, validateRequest, createUser)
router.put('/users/:id', updateUserMiddleware, validateRequest, updateUser)
router.delete('/users/:id', deleteUserMiddleware, validateRequest, deleteUser)

// Auth routes
router.post('/auth', authMiddleware, validateRequest, getToken)

export { router as rootRouter }
