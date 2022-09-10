import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FileError {
  @Field({ nullable: true })
  field: string;

  @Field()
  message: string;
}
