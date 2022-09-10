import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: string;
}
