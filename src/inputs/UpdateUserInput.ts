import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;
}
