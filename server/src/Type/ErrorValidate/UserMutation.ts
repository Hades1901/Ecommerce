import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { User } from "../../Entities/User";
import { FileError } from "./ErrorMutation";

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field((_type) => [FileError], { nullable: true })
  error?: FileError[];
}
