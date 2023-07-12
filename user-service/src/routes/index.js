import express from 'express'
import { userRouter } from './userRoutes.js'
import { cardRouter } from './cardRouters.js'
import { addressRouter } from './addressRouter.js'

const router = express.Router()

router.use('/users', userRouter)

router.use('/address', addressRouter)
router.use('/card', cardRouter)

export { router as rootRouter }
