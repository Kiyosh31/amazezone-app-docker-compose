import express from 'express'
import { createCard } from '../controllers/cardController.js'
import { createCardMiddleware } from '../middlewares/cardMiddlewares.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

router.post('', createCardMiddleware, validateRequest, createCard)

export { router as cardRouter }
