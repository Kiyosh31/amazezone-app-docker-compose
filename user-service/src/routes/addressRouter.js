import express from 'express'
import { createAddress } from '../controllers/addressController.js'
import { createAddressMiddleware } from '../middlewares/addressMiddlewares.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

router.post('', createAddressMiddleware, validateRequest, createAddress)

export { router as addressRouter }
