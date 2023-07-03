import { bookResolvers, bookTypeDefs } from './book/index.js'
import { userTypeDefs, userResolvers } from './user/index.js'
import _ from 'lodash'

const baseTypeDefs = `#graphql
  type Query
`
const typeDefs = [baseTypeDefs, userTypeDefs, bookTypeDefs]
const resolvers = _.merge({}, userResolvers, bookResolvers)

export { typeDefs, resolvers }
