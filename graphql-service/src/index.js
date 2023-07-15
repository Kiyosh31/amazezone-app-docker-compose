import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers, typeDefs } from './schema/index.js'

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const port = process.env.PORT || 4000

const { url } = await startStandaloneServer(server, {
  listen: { port: port }
})

console.log(`🚀  Server ready at: ${url}`)
