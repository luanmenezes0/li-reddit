import 'reflect-metadata';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import mikroConfig from './mikro-orm.config';
import { UserResolver } from './resolvers/user';
import { __prod__ } from './constants';

import session from 'express-session'
import connectFileStore from 'session-file-store'
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const FileStore = connectFileStore(session);

  const fileStoreOptions = {};

  app.use(session({
    name: 'qid',
    store: new FileStore(fileStoreOptions),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: 'lax',
      secure: __prod__
    },
    saveUninitialized: false,
    resave: false,
    secret: 'keyboard cat'
  }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log('server started at localhost:4000');
  });
};

main().catch((err) => {
  console.log(err);
});
