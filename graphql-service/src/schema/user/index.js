import axios from 'axios'
import { GraphQLError } from 'graphql'

const typeDefs = `#graphql
   type User {
    username: String!
    email: String!
    password: String!
  }

  extend type Query {
    allUsers: [User]!
  }
`

const resolvers = {
  Query: {
    allUsers: async () => {
      try {
        const res = await axios.get('http://user-service:3001/api/user')
        return res.data
      } catch (err) {
        throw new GraphQLError(err.message)
      }
    }
  }
}

export { typeDefs as userTypeDefs, resolvers as userResolvers }
