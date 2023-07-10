import { body, param } from 'express-validator'

const createUserMiddleware = [
  body('username').notEmpty().withMessage('You must provide a username'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must suply a password')
]

const updateUserMiddleware = [
  param('id').exists().notEmpty(),
  body('username').notEmpty().withMessage('You must provide a username'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must suply a password')
]

const deleteUserMiddleware = [param('id').exists().notEmpty()]

export { createUserMiddleware, updateUserMiddleware, deleteUserMiddleware }
