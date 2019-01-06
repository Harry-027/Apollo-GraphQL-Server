import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


const SECRET = 'ahfgjagfkaflagfoehfbwelfh3298r6932';
const app = express();

const addUser = async (req, res, next) => {
    const token = req.headers['authentication'];
    try {
        const { user } = await jwt.verify(token, SECRET);
        req.user = user;
    } catch (err) {
        console.log(err);
    }
    next();
}

app.use(addUser);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/graphql', bodyParser.json(), graphqlExpress(req => {
   return  { schema, context: { models, SECRET, user: req.user } }
}));

models.sequelize.sync().then(_ => app.listen(3000));