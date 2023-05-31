const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./gql/schema')
const jwt = require('jsonwebtoken')
const resolvers = require('./gql/resolvers')
require('dotenv').config({ path: '.env' })

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.log('Error de conexion')
    } else {
      server()
    }
  },
)

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization
      if (token) {
        try {
          const user = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.SECRET_KEY,
          )
          return {
            user,
          }
        } catch (error) {
          console.log('### error#####')
          console.log(error)
          throw new Error('token invalido')
        }
      }
    },
  })

  serverApollo.listen({ port: 3100 }).then(({ url }) => {
    console.log('###################################################')
    console.log(`servidor listo en la url ${url}`)
    console.log('###################################################')
  })
}
