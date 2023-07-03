import axios from 'axios'
import { GraphQLError } from 'graphql'

const typeDefs = `#graphql
   type Book {
    title: String!
    author: String!
    pages: Int!
  }

  extend type Query {
    books: [Book]!
  }
`

const resolvers = {
  Query: {
    books: () => {
      return [
        {
          title: 'Book 1',
          author: 'me',
          pages: 167
        },
        {
          title: 'Book 2',
          author: 'Edgar',
          pages: 190
        },
        {
          title: 'Book 3',
          author: 'Nacho',
          pages: 978
        }
      ]
    }
  }
}

export { typeDefs as bookTypeDefs, resolvers as bookResolvers }
