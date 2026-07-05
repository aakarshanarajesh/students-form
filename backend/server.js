import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB } from './config/db.js';
import { typeDefs } from './graphql/typeDefs.js';
import { studentResolvers } from './graphql/resolvers.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: studentResolvers
});

await server.start();

app.use('/graphql', expressMiddleware(server));

await connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`GraphQL server running at http://localhost:${port}/graphql`);
});
