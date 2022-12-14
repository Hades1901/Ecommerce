import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: string;
}
