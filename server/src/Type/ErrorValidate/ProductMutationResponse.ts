import { Field, ObjectType } from "type-graphql";
import { Product } from "../../Entities/Product";
import { FileError } from "./ErrorMutation";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })
export class ProductMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  product?: Product;

  @Field((_type) => [FileError], { nullable: true })
  error?: FileError[];
}
