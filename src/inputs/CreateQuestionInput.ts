import { CreateAnswerInput } from "@inputs/CreateAnswerInput";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateQuestionInput {
    @Field()
    body: string;

    @Field(() => [CreateAnswerInput])
    answers: CreateAnswerInput[]
}
