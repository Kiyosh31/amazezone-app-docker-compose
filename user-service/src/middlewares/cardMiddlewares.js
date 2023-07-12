import { body, header } from 'express-validator'

const tokenMiddleware = [
  header('Authorization').notEmpty().withMessage('You must provide a token')
]

const createCardMiddleware = [
  body('userId')
    .notEmpty()
    .withMessage('You must provide a userId for the card'),
  body('name').notEmpty().withMessage('You must provide a name for the card'),
  body('number').notEmpty().withMessage('You must provide a card number'),
  body('secretCode')
    .notEmpty()
    .withMessage('You must provide a secret code for the card'),
  body('expiration')
    .notEmpty()
    .withMessage('You must provide a expiration date'),
  body('type').notEmpty().withMessage('You must provide a type of card')
]

export { tokenMiddleware, createCardMiddleware }
