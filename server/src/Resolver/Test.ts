import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../Type/Contain";

@Resolver()
export class TestResolver {
  @Query((_return) => String)
  test(@Ctx() { req }: Context) {
    console.log(req.session.userId);
    return "Hello World ";
  }
}
