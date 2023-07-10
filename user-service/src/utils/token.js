const getToken = (req) => req.headers.authorization.split(' ')[1]

const isTokenValid = (token) => Date.now() > token.exp

export { getToken, isTokenValid }
