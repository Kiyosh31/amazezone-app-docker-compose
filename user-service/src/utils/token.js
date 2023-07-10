import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

const validateToken = (req) => {
  if (!req.headers.authorization) return false

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, secret)

  if (Date.now() > token.exp) {
    return false
  }

  return true
}

export { validateToken }
