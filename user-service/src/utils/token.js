import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

const createToken = (id, email) => {
  return jwt.sign(
    {
      id,
      email
    },
    secret
  )
}

const isTokenValid = (bearerToken) => {
  const tokenValue = bearerToken.split(' ')[1]
  return jwt.verify(tokenValue, secret, (err, data) => {
    if (err) {
      return {
        err: true,
        data: err
      }
    }

    if (data) {
      return {
        err: false,
        data: data
      }
    }
  })
}

export { secret, isTokenValid, createToken }
