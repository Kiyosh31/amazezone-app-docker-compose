import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  signinUser,
  updateUser
} from '../controllers/userController.js'
import {
  createUserMiddleware,
  deleteUserMiddleware,
  getSingleUserMiddleware,
  signinUserMiddleware,
  updateUserMiddleware
} from '../middlewares/userMiddlewares.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

router.get('', getAllUsers)
router.get('/:id', getSingleUserMiddleware, validateRequest, getUser)
router.post('', createUserMiddleware, validateRequest, createUser)
router.put('/:id', updateUserMiddleware, validateRequest, updateUser)
router.delete('/:id', deleteUserMiddleware, validateRequest, deleteUser)
router.post('/signin', signinUserMiddleware, validateRequest, signinUser)

export { router as userRouter }
