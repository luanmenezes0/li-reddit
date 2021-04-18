import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }
}

@Resolver()
export class NameResolver {
  @Query(() => String)
  name() {
    return 'Luan';
  }
}