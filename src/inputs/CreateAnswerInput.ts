import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAnswerInput {
    @Field()
    body: string;

    @Field({ nullable: true })
    isCorrect?: boolean;
}
