import { body, param, header } from 'express-validator'

const getSingleUserMiddleware = [
  header('Authorization').notEmpty().withMessage('You must provide a token')
]

const createUserMiddleware = [
  body('username').notEmpty().withMessage('You must provide a username'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password')
]

const updateUserMiddleware = [
  param('id').exists().notEmpty(),
  body('username').notEmpty().withMessage('You must provide a username'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password')
]

const deleteUserMiddleware = [param('id').exists().notEmpty()]

const signinUserMiddleware = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password')
]

export {
  createUserMiddleware,
  updateUserMiddleware,
  deleteUserMiddleware,
  signinUserMiddleware,
  getSingleUserMiddleware
}
