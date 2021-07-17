import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateQuestionInput {
    @Field({ nullable: true })
    body?: string;
}
