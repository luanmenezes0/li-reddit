import path from 'path';
import { MikroORM } from '@mikro-orm/core';

import { Post } from './entities/Post';
import { User } from './entities/User';
import { __prod__ } from './constants';

export default {
  entities: [Post, User],
  dbName: 'lireddit',
  type: 'postgresql',
  debug: !__prod__,
  user: 'postgres',
  password: 'luan9999',
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
